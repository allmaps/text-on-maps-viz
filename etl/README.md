# ETL

This repository contains scripts to convert David Rumsey OCR data into a PMTiles file that contains polygons and points with OCR data.

> [!NOTE]
> All scripts in this repository use newline-delimited JSON as input and output. See https://jsonlines.org/ and https://stevage.github.io/ndgeojson/

Steps to create the PMTiles file:

1. Download `maps.ndjson` from https://zenodo.org/api/records/15316188/draft/files/maps.ndjson/content and save it as `./data/input/maps.ndjson`.
2. Create OCR Web Annotations from David Rumsey mapKurator data:
   - Download the 51 GB `rumsey_57k_english.zip` file from https://s3.msi.umn.edu/rumsey.v3/rumsey_57k_english.zip
   - Save this file to `../data/input/rumsey_57k_english.zip`
   - Run `./scripts/ocr-annotations.sh` to create `../data/output/ocr.annotations.ndjson`, a single newline-delimited JSON file containing all the OCR annotations.
3. Combine the georeference data and OCR data and create a single GeoJSON file by running `./scripts/geojson.sh`. This will create a file called `../data/output/ocr.geojsonl`.
4. Filter by feature type and zoom level by running `./scripts/filter-geojson-by-layer.sh`. This will create multiple GeoJSON files in the `../data/output/` directory.
5. Create PMTiles files for each layer and geometry type by running `./scripts/tippecanoe.sh`
6. Combine these PMTiles files into a single PMTiles file by running `./scripts/tile-join.sh`

To summarize:

1. Download `maps.ndjson` and `rumsey_57k_english.zip`
2. Then run:

```bash
./scripts/ocr-annotations.sh
./scripts/geojson.sh
./scripts/filter-geojson-by-layer.sh
./scripts/tippecanoe.sh
./scripts/tile-join.sh
```
