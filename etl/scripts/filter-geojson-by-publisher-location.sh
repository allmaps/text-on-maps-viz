#!/usr/bin/env bash

node --experimental-strip-types src/filter-geojson-by-publisher-location.ts \
  '["paris","lyon","marseille","nantes"]' \
  < ../data/output/ocr.geojsonl \
  > ../data/output/ocr-paris-lyon-marseille-nantes.geojsonl
