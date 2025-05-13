# ETL

This repository contains scripts to convert David Rumsey OCR data into a PMTiles file that contains polygons and points with OCR data.

> [!NOTE]
> All scripts in this repository use newline-delimited JSON as input and output. See https://jsonlines.org/ and https://stevage.github.io/ndgeojson/

> [!NOTE]
> The GeoJSON file created from the OCR data contains 2 Features for every OCR text: one for the polygon, and one for the center point of the polygon. In total, this amounts to a 181 GB GeoJON file containing 220 million features. To make this file and the visualization easier to work with, we filter the data by `publisherLocation` to contain only maps published in Paris, Lyon, Marseille, and Nantes. This is done by running the `./src/filter-geojson-by-publisher-location.sh` script.

Steps to create the PMTiles file:

1. Download `maps.ndjson` from https://zenodo.org/api/records/15316188/draft/files/maps.ndjson/content and save it as `./data/input/maps.ndjson`.
2. Create Georeference Annotations from `maps.ndjson` by running `./scripts/georeference-annotations.sh`
3. Create OCR Web Annotations from David Rumsey mapKurator data:
   - Download the 51 GB `rumsey_57k_english.zip` file from https://s3.msi.umn.edu/rumsey.v3/rumsey_57k_english.zip
   - Save this file to `../data/input/rumsey_57k_english.zip`
   - Run `./scripts/ocr-annotations.sh` to create `../data/output/ocr.annotations.ndjson`, a single newline-delimited JSON file containing all the OCR annotations.
4. Combine the georeference data and OCR data and create a single GeoJSON file by running `./scripts/geojson.sh`. This will create a file called `../data/output/ocr.geojsonl`.
5. Filter by publisher location by running `./scripts/filter-geojson-by-publisher-location.sh`. This will create a smaller GeoJSON file in the `../data/output/` directory.
6. Generate a Bash script to run Tippecanoe by running `./scripts/create-tippecanoe-script.sh`. This will create a file called `tippecanoe.sh` in the `.scripts/` directory.
7. Create PMTiles files for each layer and geometry type by running `./scripts/tippecanoe.sh`
8. Combine these PMTiles files into a single PMTiles file by running `./scripts/tile-join.sh`

To summarize:

1. Download `maps.ndjson` and `rumsey_57k_english.zip`
2. Then run:

```bash
./scripts/georeference-annotations.sh
./scripts/ocr-annotations.sh
./scripts/geojson.sh
./scripts/filter-geojson-by-publisher-location.sh
./scripts/create-tippecanoe-script.sh
./scripts/tippecanoe.sh
./scripts/tile-join.sh
```
