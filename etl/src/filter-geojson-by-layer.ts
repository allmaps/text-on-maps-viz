import { pipeline, Transform, type TransformCallback } from 'node:stream'

import ndjson from 'ndjson'

const layer = process.argv[2]

if (!layer) {
  console.error(`Usage: node filter-geojson-by-layer.js <layer>.`)
  process.exit(1)
}

pipeline(
  process.stdin,
  ndjson.parse({ strict: false }),
  new Transform({
    objectMode: true,
    transform: (feature: any, _, callback: TransformCallback) => {
      if (feature.tippecanoe.layer === layer) {
        callback(null, {
          ...feature,
          tippecanoe: undefined
        })
      } else {
        callback()
      }
    }
  }),
  ndjson.stringify(),
  process.stdout,
  (err) => {
    if (err) {
      console.error('Error:', err)
    }
  }
)
