import { pipeline, Transform, type TransformCallback } from 'node:stream'

import ndjson from 'ndjson'

const locationsStr = process.argv[2]

let locations: string[] = []

if (!locationsStr) {
  console.error(
    `Usage: node filter-geojson-publisher-location.js <locations-as-json-array>.`
  )
  process.exit(1)
} else {
  try {
    locations = JSON.parse(locationsStr)
  } catch (e) {
    console.error(`Error: ${locationsStr} is not a valid JSON array.`)
    process.exit(1)
  }
}

if (locations.length === 0) {
  console.error(`Error: No locations provided.`)
  process.exit(1)
}

locations = locations.map((location) => location.toLowerCase())

pipeline(
  process.stdin,
  ndjson.parse({ strict: false }),
  new Transform({
    objectMode: true,
    transform: (feature: any, _, callback: TransformCallback) => {
      const location = feature.properties.publisherLocation

      if (typeof location === 'string') {
        if (locations.includes(location.toLowerCase())) {
          callback(null, feature)
          return
        }
      }

      callback()
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
