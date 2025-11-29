import { DatabaseSync } from 'node:sqlite'

import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const database = new DatabaseSync('../data/output/annotations.db')

const getMaps = database.prepare(`
  SELECT json(map) AS map
  FROM maps
  WHERE allmapsImageId = ?
`)

export const GET: RequestHandler = ({ params }) => {
  const { allmapsImageId } = params

  const row = getMaps.get(allmapsImageId) as { map: string } | undefined

  if (row && row.map) {
    const map = JSON.parse(row.map)
    return new Response(JSON.stringify(map))
  } else {
    throw error(404, 'Map not found')
  }
}
