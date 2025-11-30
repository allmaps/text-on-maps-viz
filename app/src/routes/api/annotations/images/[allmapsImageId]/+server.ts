import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params, platform }) => {
  const db = platform?.env?.DB

  if (!db) {
    throw error(500, 'Database not available')
  }

  const { allmapsImageId } = params

  const row = await db
    .prepare('SELECT json(map) AS map FROM maps WHERE allmapsImageId = ?')
    .bind(allmapsImageId)
    .first<{ map: string }>()

  if (row && row.map) {
    const map = JSON.parse(row.map)
    return new Response(JSON.stringify(map))
  } else {
    throw error(404, 'Map not found')
  }
}
