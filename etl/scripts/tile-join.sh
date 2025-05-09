#!/usr/bin/env bash

tile-join -o ../data/output/ocr.pmtiles -pk --force \
  ../data/output/ocr-polygons-neighborhood.pmtiles \
  ../data/output/ocr-polygons-city.pmtiles \
  ../data/output/ocr-polygons-state.pmtiles \
  ../data/output/ocr-polygons-country.pmtiles \
  ../data/output/ocr-polygons-continent.pmtiles \
  ../data/output/ocr-points-neighborhood.pmtiles \
  ../data/output/ocr-points-city.pmtiles \
  ../data/output/ocr-points-state.pmtiles \
  ../data/output/ocr-points-country.pmtiles \
  ../data/output/ocr-points-continent.pmtiles
