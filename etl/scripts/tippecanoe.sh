#!/usr/bin/env bash

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
  -o ../data/output/ocr-polygons-neighborhood.pmtiles ../data/output/ocr-polygons-neighborhood.geojsonl

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
  -o ../data/output/ocr-points-neighborhood.pmtiles ../data/output/ocr-points-neighborhood.geojsonl

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
  -o ../data/output/ocr-polygons-city.pmtiles ../data/output/ocr-polygons-city.geojsonl

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
  -o ../data/output/ocr-points-city.pmtiles ../data/output/ocr-points-city.geojsonl

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
  -o ../data/output/ocr-polygons-state.pmtiles ../data/output/ocr-polygons-state.geojsonl

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
  -o ../data/output/ocr-points-state.pmtiles ../data/output/ocr-points-state.geojsonl

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
  -o ../data/output/ocr-polygons-country.pmtiles ../data/output/ocr-polygons-country.geojsonl

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
  -o ../data/output/ocr-points-country.pmtiles ../data/output/ocr-points-country.geojsonl

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
  -o ../data/output/ocr-polygons-continent.pmtiles ../data/output/ocr-polygons-continent.geojsonl

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
  -o ../data/output/ocr-points-continent.pmtiles ../data/output/ocr-points-continent.geojsonl

  
