import { Transform, type TransformCallback } from 'node:stream'

import ndjson from 'ndjson'

const layer = process.argv[2]

if (!layer) {
  console.error(`Usage: node filter-geojson-by-layer.js <layer>.`)
  process.exit(1)
}

process.stdin
  .pipe(ndjson.parse({ strict: false }))
  .pipe(
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
    })
  )
  .pipe(ndjson.stringify())
  .pipe(process.stdout)
