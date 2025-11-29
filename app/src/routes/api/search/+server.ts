import { DatabaseSync } from 'node:sqlite'

import type { RequestHandler } from './$types'

const database = new DatabaseSync('../data/output/annotations.db')

export const GET: RequestHandler = ({ url }) => {
  const query = (url.searchParams.get('query') || '') + '*'
  const pubListNosParam = url.searchParams.get('pubListNos') || ''
  const pubListNos = pubListNosParam ? pubListNosParam.split(',') : []

  if (pubListNos.length === 0) {
    return new Response(JSON.stringify([]))
  }

  // Build dynamic query with placeholders for pubListNos
  const placeholders = pubListNos.map(() => '?').join(', ')
  const searchText = database.prepare(`
    SELECT
      a.id,
      a.entryId,
      a.imageId,
      a.allmapsImageId,
      a.text,
      a.listNo,
      a.pubListNo,
      a.publisherLocation,
      a.insideMapMask,
      a.mapArea,
      json(a.bbox) as bbox,
      fts.rank
    FROM annotations_fts fts
    JOIN annotations a ON a.rowid = fts.rowid
    WHERE annotations_fts MATCH ?
      AND a.pubListNo IN (${placeholders})
    ORDER BY rank
    LIMIT 100
  `)

  const results = searchText.all(query, ...pubListNos)
  return new Response(
    JSON.stringify(
      results.map((result) => ({
        ...result,
        bbox: result.bbox && typeof result.bbox === 'string' ? JSON.parse(result.bbox) : undefined
      }))
    )
  )
}
