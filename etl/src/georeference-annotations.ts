import { pipeline, Transform, type TransformCallback } from 'node:stream'

import { generateAnnotation } from '@allmaps/annotation'

import ndjson from 'ndjson'

pipeline(
  process.stdin,
  ndjson.parse({ strict: false }),
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
  }),
  ndjson.stringify(),
  process.stdout,
  (err) => {
    if (err) {
      console.error('Error:', err)
    }
  }
)
