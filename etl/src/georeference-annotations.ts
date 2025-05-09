import { Transform, type TransformCallback } from 'node:stream'

import { generateAnnotation } from '@allmaps/annotation'

import ndjson from 'ndjson'

process.stdin
  .pipe(ndjson.parse({ strict: false }))
  .pipe(
    new Transform({
      objectMode: true,
      transform: (map: any, _, callback: TransformCallback) => {
        const annotation = {
          ...generateAnnotation(map),
          _mapkurator: map._mapkurator,
          _rumsey: map._rumsey
        }

        callback(null, annotation)
      }
    })
  )
  .pipe(ndjson.stringify())
  .pipe(process.stdout)
