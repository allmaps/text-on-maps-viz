import { createReadStream } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

import ndjson from 'ndjson'

type MapsByString = Record<string, unknown>

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const mapsPath = join(__dirname, '../../../data/input/maps.ndjson')

export function readMaps(): Promise<unknown[]> {
  const maps: unknown[] = []

  return new Promise((resolve) => {
    createReadStream(mapsPath, 'utf-8')
      .pipe(ndjson.parse({ strict: false }))
      .on('data', (map) => {
        maps.push(map)
      })
      .on('end', function () {
        resolve(maps)
      })
  })
}

export async function readMapsByImageId(): Promise<MapsByString> {
  let mapsbyImageId: MapsByString = {}

  const maps = await readMaps()

  if (Array.isArray(maps)) {
    for (const map of maps) {
      if (
        map &&
        typeof map === 'object' &&
        'resource' in map &&
        map.resource &&
        typeof map.resource === 'object' &&
        'id' in map.resource &&
        map.resource.id &&
        typeof map.resource.id === 'string'
      ) {
        const imageId = map.resource.id

        if (imageId) {
          mapsbyImageId[imageId] = map
        }
      }
    }
  }

  return mapsbyImageId
}

export async function readMapsByFilename(): Promise<MapsByString> {
  let mapsbyFilename: MapsByString = {}

  const maps = await readMaps()

  if (Array.isArray(maps)) {
    for (const map of maps) {
      if (
        map &&
        typeof map === 'object' &&
        '_rumsey' in map &&
        map._rumsey &&
        typeof map._rumsey === 'object' &&
        'filename' in map._rumsey &&
        map._rumsey.filename &&
        typeof map._rumsey.filename === 'string'
      ) {
        const filename = map._rumsey.filename

        if (filename) {
          mapsbyFilename[filename] = map
        }
      }
    }
  }

  return mapsbyFilename
}
