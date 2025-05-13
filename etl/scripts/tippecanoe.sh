#!/usr/bin/env bash

pnpm filter-geojson-by-layer ocr-polygons-neighborhood < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z14 -z24 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-polygons \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-polygons-neighborhood.pmtiles
    
pnpm filter-geojson-by-layer ocr-points-neighborhood < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z14 -z24 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-points \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-points-neighborhood.pmtiles
    
pnpm filter-geojson-by-layer ocr-polygons-city < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z11 -z15 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-polygons \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-polygons-city.pmtiles
    
pnpm filter-geojson-by-layer ocr-points-city < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z11 -z15 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-points \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-points-city.pmtiles
    
pnpm filter-geojson-by-layer ocr-polygons-state < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z8 -z12 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-polygons \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-polygons-state.pmtiles
    
pnpm filter-geojson-by-layer ocr-points-state < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z8 -z12 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-points \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-points-state.pmtiles
    
pnpm filter-geojson-by-layer ocr-polygons-country < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z5 -z9 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-polygons \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-polygons-country.pmtiles
    
pnpm filter-geojson-by-layer ocr-points-country < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z5 -z9 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-points \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-points-country.pmtiles
    
pnpm filter-geojson-by-layer ocr-polygons-continent < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z1 -z6 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-polygons \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-polygons-continent.pmtiles
    
pnpm filter-geojson-by-layer ocr-points-continent < ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl | \
  tippecanoe --read-parallel -f \
    -Z1 -z6 \
    --simplify-only-low-zooms --visvalingam \
    -l ocr-points \
    --drop-densest-as-needed \
    -y "text" \
    -y "allmapsImageId" \
    -y "score" \
    -y "totalLabelCount" \
    -y "insideMapMask" \
    -y "mapArea" \
    -y "listNo" \
    -y "pubListNo" \
    -y "publisherLocation" \
    -o ../data/output/ocr-points-continent.pmtiles
    
  
