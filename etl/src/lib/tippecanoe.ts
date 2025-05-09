const MIN_ZOOM = 1
const MAX_ZOOM = 24

const areas = [
  {
    label: 'neighborhood',
    minArea: 0,
    maxArea: 5_000_000,
    minZoom: 14,
    maxZoom: MAX_ZOOM
  },
  {
    label: 'city',
    minArea: 5_000_000,
    maxArea: 2_000_000_000,
    minZoom: 11,
    maxZoom: 15
  },
  {
    label: 'state',
    minArea: 2_000_000_000,
    maxArea: 7_000_000_000,
    minZoom: 8,
    maxZoom: 12
  },
  {
    label: 'country',
    minArea: 7_000_000_000,
    maxArea: 15_000_000_000_000,
    minZoom: 5,
    maxZoom: 9
  },
  {
    label: 'continent',
    minArea: 15_000_000_000_000,
    maxArea: Infinity,
    minZoom: MIN_ZOOM,
    maxZoom: 6
  }
]

export function getLayers(label: string) {
  return [
    {
      inputLayer: `ocr-polygons-${label}`,
      outputLayer: `ocr-polygons`
    },
    {
      inputLayer: `ocr-points-${label}`,
      outputLayer: `ocr-points`
    }
  ]
}

export function getAllLayers() {
  return areas.map((area) => getLayers(area.label)).flat()
}

export function getAreas() {
  return areas
}

export function getZoomLevel(area: number) {
  const areaRange = areas.find(
    (range) => area >= range.minArea && area < range.maxArea
  )

  if (areaRange) {
    return {
      label: areaRange.label,
      minZoom: areaRange.minZoom,
      maxZoom: areaRange.maxZoom
    }
  }

  throw new Error('Area not found in zoom level ranges')
}
