import { Transform, type TransformCallback } from 'node:stream'

import ndjson from 'ndjson'

import turfCenterOfMass from '@turf/center-of-mass'
import turfArea from '@turf/area'
import turfBooleanIntersects from '@turf/boolean-intersects'
import turfSimplify from '@turf/simplify'

import { validateGeoreferencedMap } from '@allmaps/annotation'
import { GcpTransformer } from '@allmaps/transform'

import { readMapsByImageId } from './lib/maps.ts'
import { generateId, generateChecksum } from './lib/id.ts'
import { getZoomLevel } from './lib/tippecanoe.ts'

import type { GeoreferencedMap } from '@allmaps/annotation'
import type { GeojsonPolygon } from '@allmaps/types'

const addTippecanoe = true

type OcrAnnotation = {
  body: {
    value: string
  }
  target: {
    source: {
      id: string
    }
    selector: {
      value: string
    }
  }
  _mapkurator: {
    score: number
    postOcrLabel: string
    totalLabelCount: number
  }
  _rumsey: {
    filename: string
    listNo: string
    pubListNo: string
    publisherLocation: string
  }
}

type CurrentMap = {
  imageId: string
  map: GeoreferencedMap
  transformer: GcpTransformer
  area: number
  geoMask: GeojsonPolygon
}

const mapsByImageId = await readMapsByImageId()

let currentMap: CurrentMap | undefined = undefined

process.stdin
  .pipe(ndjson.parse({ strict: false }))
  .pipe(
    new Transform({
      objectMode: true,
      transform: function (ocrAnnotation: any, _, callback: TransformCallback) {
        const features = processOcrAnnotationOrLog(ocrAnnotation)
        features.forEach((feature) => this.push(feature))
        callback()
      }
    })
  )
  .pipe(ndjson.stringify())
  .pipe(process.stdout)

function roundWithDecimals(num: number, decimals = 2) {
  const pow = 10 ** decimals
  return Math.round((num + Number.EPSILON) * pow) / pow
}

function parseSvgPolygon(svg: string): [number, number][] {
  const result = /points="(?<points>.+)"/.exec(svg)
  const groups = result?.groups

  if (groups && groups.points) {
    const pointStrings = groups.points.trim().split(/\s+/)

    // Resource masks are not round-trip: they don't repeat the first point at the end of the list of points.
    // According to their spec, SVG polygons are not supposed to be round-trip either.
    // Here we deal with inputs that are round-trip by removing the last point
    if (pointStrings[0] === pointStrings[pointStrings.length - 1]) {
      pointStrings.splice(-1)
    }

    if (pointStrings.length >= 3) {
      return pointStrings.map((point: string) => {
        const numberStrings = point.split(',')

        if (
          numberStrings.length === 2 &&
          numberStrings[0] &&
          numberStrings[1]
        ) {
          return [parseFloat(numberStrings[0]), parseFloat(numberStrings[1])]
        } else {
          throw new Error('Could not parse resource mask')
        }
      })
    } else {
      throw new Error('Could not parse resource mask')
    }
  } else {
    throw new Error('Could not parse resource mask')
  }
}

function processOcrAnnotationOrLog(annotation: OcrAnnotation) {
  try {
    return processOcrAnnotation(annotation)
  } catch (err) {
    console.error(
      `Error creating transformer for imageId: ${annotation.target.source.id}`,
      err && typeof err === 'object' && 'message' in err
        ? err.message
        : 'Unknown error'
    )
    return []
  }
}

function processOcrAnnotation(annotation: OcrAnnotation) {
  const imageId = annotation.target.source.id
  const mapData = mapsByImageId[imageId]

  if (mapData) {
    if (!currentMap || currentMap.imageId !== imageId) {
      const mapOrMaps = validateGeoreferencedMap(mapData)
      const map = Array.isArray(mapOrMaps) ? mapOrMaps[0] : mapOrMaps

      if (map) {
        const transformer = new GcpTransformer(
          map.gcps,
          map.transformation?.type
        )

        const geoMask = transformer.transformToGeoAsGeojson(
          [map.resourceMask],
          {
            maxDepth: 1
          }
        )

        const area = turfArea(geoMask)

        currentMap = {
          imageId,
          map,
          transformer,
          geoMask,
          area
        }
      }
    }

    if (currentMap) {
      const ocrText = annotation.body.value
      const allmapsImageId = generateId(imageId)
      const ocrResourcePolygon = parseSvgPolygon(
        annotation.target.selector.value
      )

      const ocrGeojsonPolygon = currentMap.transformer.transformToGeoAsGeojson(
        [ocrResourcePolygon],
        {
          maxDepth: 0
        }
      )

      const simplifiedOcrGeojsonPolygon = turfSimplify(ocrGeojsonPolygon, {
        tolerance: 0.00001,
        highQuality: false
      })

      const insideMapMask = turfBooleanIntersects(
        currentMap.geoMask,
        ocrGeojsonPolygon
      )

      const geojsonPoint = turfCenterOfMass(ocrGeojsonPolygon).geometry

      const checksumSource = [imageId, ocrResourcePolygon, ocrText]

      const properties = {
        imageId,
        allmapsImageId,
        entryId: generateChecksum(checksumSource),
        text: ocrText,
        score: roundWithDecimals(annotation._mapkurator.score),
        totalLabelCount: annotation._mapkurator.totalLabelCount,
        insideMapMask,
        mapArea: Math.round(currentMap.area),
        listNo: annotation._rumsey.listNo,
        pubListNo: annotation._rumsey.pubListNo,
        publisherLocation: annotation._rumsey.publisherLocation
      }

      const zoomLevel = getZoomLevel(currentMap.area)

      const tippecanoe = {
        minzoom: Math.max(zoomLevel.minZoom - 2, 1),
        maxzoom: zoomLevel.maxZoom + 2
      }

      const polygonFeature = {
        type: 'Feature',
        properties,
        tippecanoe: addTippecanoe
          ? {
              layer: `ocr-polygons-${zoomLevel.label}`,
              ...tippecanoe
            }
          : undefined,
        geometry: simplifiedOcrGeojsonPolygon
      }

      const pointFeature = {
        type: 'Feature',
        properties,
        tippecanoe: addTippecanoe
          ? {
              layer: `ocr-points-${zoomLevel.label}`,
              ...tippecanoe
            }
          : undefined,
        geometry: geojsonPoint
      }

      return [polygonFeature, pointFeature]
    }
  }

  return []
}
