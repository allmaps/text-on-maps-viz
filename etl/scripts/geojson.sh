#!/usr/bin/env bash

pnpm run --silent geojson < ../data/output/ocr.annotations.ndjson > ../data/output/ocr.geojsonl
