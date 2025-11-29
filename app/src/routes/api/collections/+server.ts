import { readFileSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'

import { parse as parseJsonc } from 'jsonc-parser'

import { generateAnnotation } from '@allmaps/annotation'

import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import type { GeoreferencedMap } from '@allmaps/annotation'

const database = new DatabaseSync('../data/output/annotations.db')

type Collection = {
  title: string
  pubListNo: string
}

type DbMapRow = {
  pubListNo: string
  listNo: string
  allmapsImageId: string
  map: string // JSON string from database
}

type DbMap = {
  pubListNo: string
  listNo: string
  annotationUrl: string
  map: GeoreferencedMap
}

const collections = parseJsonc(
  readFileSync('../etl/src/collections.fantastic-futures.jsonc', 'utf8')
) as Collection[]

const getMaps = database.prepare(`
  SELECT c.*, json(maps.map) AS map
  FROM collections c
  JOIN maps ON c.allmapsImageId = maps.allmapsImageId
  --ORDER BY c.pubListNo, c.listNo
`)

export const GET: RequestHandler = ({ url }) => {
  const rows = getMaps.all() as unknown as DbMapRow[]
  const maps: DbMap[] = rows.map((row) => ({
    ...row,
    allmapsImageId: undefined,
    annotationUrl: `https://annotations.allmaps.org/images/${row.allmapsImageId}`,
    map: JSON.parse(row.map) as GeoreferencedMap
  }))

  const mapsByPubListNo = Object.groupBy(maps, ({ pubListNo }) => pubListNo)

  const result = collections
    .map((collection: { title: string; pubListNo: string }) => ({
      title: collection.title,
      pubListNo: collection.pubListNo,
      maps: mapsByPubListNo[collection.pubListNo] ?? []
    }))
    .filter((collection) => collection.maps.length > 0)

  return new Response(JSON.stringify(result))
}
