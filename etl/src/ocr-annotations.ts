import { fileURLToPath } from 'url'
import { join } from 'path'

import unzipper from 'unzipper'

import { readMapsByFilename } from './lib/maps.ts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rumseyZipPath = join(__dirname, '../../data/input/rumsey_57k_english.zip')

const directory = await unzipper.Open.file(rumseyZipPath)

const mapsbyFilename = await readMapsByFilename()

for (const file of directory.files) {
  const filename = file.path.replace(/\.geojson$/, '')

  let text: string | undefined
  let geojson: unknown

  try {
    const stream = file.stream()
    text = await new Response(stream).text()
    geojson = JSON.parse(text)
  } catch {
    if (text) {
      console.error(`Can't parse GeoJSON for filename: ${filename}`)
      console.error(text)
    } else {
      console.error(`Can't read text for filename: ${filename}`)
    }

    continue
  }

  const map = mapsbyFilename[filename]

  if (!map) {
    console.error(`Map not found for filename: ${filename}`)
    continue
  }

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
  } else {
    console.error(`Map resource not found for filename: ${filename}`)
    continue
  }

  const imageId = map.resource.id

  if (
    geojson &&
    typeof geojson === 'object' &&
    'features' in geojson &&
    geojson.features &&
    Array.isArray(geojson.features)
  ) {
    for (const feature of geojson.features) {
      let text: string
      let score: number
      let resourceCoordinates: number[][]

      if ('properties' in feature && feature.properties) {
        if (
          'text' in feature.properties &&
          feature.properties.text !== undefined &&
          typeof feature.properties.text === 'string'
        ) {
          text = feature.properties.text
        } else {
          console.error(
            `Text property not found in GeoJSON properties for filename: ${filename}`
          )
          console.error(feature.properties)
          continue
        }

        if (
          'score' in feature.properties &&
          feature.properties.score !== undefined &&
          typeof feature.properties.score === 'number'
        ) {
          score = feature.properties.score
        } else {
          console.error(
            `Score property not found in GeoJSON properties for filename: ${filename}`
          )
          console.error(feature.properties)
          continue
        }

        if (
          'img_coordinates' in feature.properties &&
          feature.properties.img_coordinates &&
          Array.isArray(feature.properties.img_coordinates)
        ) {
          resourceCoordinates = feature.properties.img_coordinates.map(
            (coordinate: [number, number]) => [
              Math.round(coordinate[0]),
              Math.round(coordinate[1]) * -1
            ]
          )
        } else {
          console.error(
            `Resource coordinates property not found in GeoJSON properties for filename: ${filename}`
          )
          console.error(feature.properties)
          continue
        }

        let date: string | undefined
        let pubDate: string | undefined
        let listNo: string | undefined
        let pubListNo: string | undefined
        let publisherLocation: string | undefined

        if (
          '_rumsey' in map &&
          map._rumsey &&
          typeof map._rumsey === 'object'
        ) {
          if (
            'date' in map._rumsey &&
            map._rumsey.date &&
            typeof map._rumsey.date === 'string'
          ) {
            date = map._rumsey.date
          }

          if (
            'pubDate' in map._rumsey &&
            map._rumsey.pubDate &&
            typeof map._rumsey.pubDate === 'string'
          ) {
            pubDate = map._rumsey.pubDate
          }

          if (
            'listNo' in map._rumsey &&
            map._rumsey.listNo &&
            typeof map._rumsey.listNo === 'string'
          ) {
            listNo = map._rumsey.listNo
          }

          if (
            'fieldValues' in map._rumsey &&
            map._rumsey.fieldValues &&
            typeof map._rumsey.fieldValues === 'object'
          ) {
            if (
              'Pub List No' in map._rumsey.fieldValues &&
              map._rumsey.fieldValues['Pub List No'] &&
              Array.isArray(map._rumsey.fieldValues['Pub List No'])
            ) {
              pubListNo = map._rumsey.fieldValues['Pub List No'][0]
            }

            if (
              'Publisher Location' in map._rumsey.fieldValues &&
              map._rumsey.fieldValues['Publisher Location'] &&
              Array.isArray(map._rumsey.fieldValues['Publisher Location'])
            ) {
              publisherLocation =
                map._rumsey.fieldValues['Publisher Location'][0]
            }
          }
        }

        if (text.length > 0) {
          const svgPolygonPoints = resourceCoordinates
            .map((coordinate) => coordinate.join(','))
            .join(' ')

          const annotation = {
            '@context': 'http://www.w3.org/ns/anno.jsonld',
            type: 'Annotation',
            body: {
              type: 'TextualBody',
              value: text
            },
            target: {
              type: 'SpecificResource',
              source: {
                id: imageId,
                type: 'ImageService2'
              },
              selector: {
                type: 'SvgSelector',
                value: `<svg><polygon points=\"${svgPolygonPoints}\" /></svg>`
              }
            },
            _mapkurator: {
              score,
              postOcrLabel: feature.properties.postocr_label,
              totalLabelCount: geojson.features.length
            },
            _rumsey: {
              filename,
              date,
              pubDate,
              listNo,
              pubListNo,
              publisherLocation
            }
          }

          console.log(JSON.stringify(annotation))
        }
      }
    }
  }
}
