import { getAreas, getLayers } from './lib/tippecanoe.ts'

const inputGeojsonPath = process.argv[2]

if (!inputGeojsonPath) {
  console.error('Please provide the path to the input GeoJSON file.')
  process.exit(1)
}

function generateScript() {
  const shebang = '#!/usr/bin/env bash'

  const areas = getAreas()

  const layerCommands = areas
    .map((area) => {
      const layers = getLayers(area.label)

      return layers.map(
        (
          layer
        ) => `pnpm filter-geojson-by-layer ${layer.inputLayer} < ${inputGeojsonPath} | \\
  tippecanoe --read-parallel -f \\
    -Z${area.minZoom} -z${area.maxZoom} \\
    --simplify-only-low-zooms --visvalingam \\
    -l ${layer.outputLayer} \\
    --drop-densest-as-needed \\
    -y "text" \\
    -y "allmapsImageId" \\
    -y "score" \\
    -y "totalLabelCount" \\
    -y "insideMapMask" \\
    -y "mapArea" \\
    -y "listNo" \\
    -y "pubListNo" \\
    -y "publisherLocation" \\
    -o ../data/output/${layer.inputLayer}.pmtiles
    `
      )
    })
    .flat()

  const script = `${shebang}

${layerCommands.join('\n')}
  `

  return script
}

console.log(generateScript())
