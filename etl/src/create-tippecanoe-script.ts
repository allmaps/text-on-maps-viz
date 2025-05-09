import { getAreas, getLayers } from './lib/tippecanoe.ts'

function generateScript() {
  const shebang = '#!/usr/bin/env bash'

  const areas = getAreas()

  const layerCommands = areas
    .map((area) => {
      const layers = getLayers(area.label)

      return layers.map(
        (layer) => `tippecanoe --read-parallel -f \\
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
  -o ../data/output/${layer.inputLayer}.pmtiles ../data/output/${layer.inputLayer}.geojsonl
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
