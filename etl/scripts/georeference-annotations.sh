#!/usr/bin/env bash

pnpm run --silent georeference-annotations < ../data/input/maps.ndjson \
  > ../data/output/georeference-annotations.ndjson
