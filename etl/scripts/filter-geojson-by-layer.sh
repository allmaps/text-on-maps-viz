#!/usr/bin/env bash

node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-polygons-neighborhood < ../data/output/ocr.geojsonl > ../data/output/ocr-polygons-neighborhood.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-polygons-city < ../data/output/ocr.geojsonl > ../data/output/ocr-polygons-city.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-polygons-state < ../data/output/ocr.geojsonl > ../data/output/ocr-polygons-state.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-polygons-country < ../data/output/ocr.geojsonl > ../data/output/ocr-polygons-country.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-polygons-continent < ../data/output/ocr.geojsonl > ../data/output/ocr-polygons-continent.geojsonl

node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-points-neighborhood < ../data/output/ocr.geojsonl > ../data/output/ocr-points-neighborhood.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-points-city < ../data/output/ocr.geojsonl > ../data/output/ocr-points-city.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-points-state < ../data/output/ocr.geojsonl > ../data/output/ocr-points-state.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-points-country < ../data/output/ocr.geojsonl > ../data/output/ocr-points-country.geojsonl
node --experimental-strip-types src/filter-geojson-by-layer.ts ocr-points-continent < ../data/output/ocr.geojsonl > ../data/output/ocr-points-continent.geojsonl
