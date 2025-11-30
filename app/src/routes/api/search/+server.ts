import type { RequestHandler } from './$types'

interface SearchResult {
  id: number
  entryId: string
  imageId: string
  allmapsImageId: string
  text: string
  listNo: string
  pubListNo: string
  publisherLocation: string
  insideMapMask: number
  mapArea: number
  bbox: string | null
  rank: number
}

export const GET: RequestHandler = async ({ url, platform }) => {
  const db = platform?.env?.DB
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  const query = (url.searchParams.get('query') || '') + '*'
  const pubListNosParam = url.searchParams.get('pubListNos') || ''
  const pubListNos = pubListNosParam ? pubListNosParam.split(',') : []

  if (pubListNos.length === 0) {
    return new Response(JSON.stringify([]))
  }

  // Build dynamic query with placeholders for pubListNos
  const placeholders = pubListNos.map(() => '?').join(', ')
  const sql = `
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
  `

  const { results } = await db.prepare(sql).bind(query, ...pubListNos).all<SearchResult>()

  return new Response(
    JSON.stringify(
      results.map((result) => ({
        ...result,
        bbox:
          result.bbox && typeof result.bbox === 'string' ? JSON.parse(result.bbox) : undefined
      }))
    )
  )
}
