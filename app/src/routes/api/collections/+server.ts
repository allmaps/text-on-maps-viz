import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { parse as parseJsonc } from 'jsonc-parser'

import type { GeoreferencedMap } from '@allmaps/annotation'

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

export const GET: RequestHandler = async ({ url, platform }) => {
  const db = platform?.env?.DB
  const assets = platform?.env?.ASSETS

  if (!db) {
    throw error(500, 'Database not available')
  }

  // Fetch collections from static asset (JSONC format)
  let collections: Collection[]
  if (assets) {
    const collectionsResponse = await assets.fetch(
      new URL('/collections.fantastic-futures.jsonc', url)
    )
    const text = await collectionsResponse.text()
    collections = parseJsonc(text)
  } else {
    // Fallback for local dev without assets binding
    const collectionsResponse = await fetch(
      new URL('/collections.fantastic-futures.jsonc', url)
    )
    const text = await collectionsResponse.text()
    collections = parseJsonc(text)
  }

  const { results: rows } = await db
    .prepare(
      `
      SELECT c.*, json(maps.map) AS map
      FROM collections c
      JOIN maps ON c.allmapsImageId = maps.allmapsImageId
    `
    )
    .all<DbMapRow>()

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
