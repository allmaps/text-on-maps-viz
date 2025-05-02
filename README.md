# text-on-maps-viz

This repository contains code and scripts to visualize text detected on maps from the [David Rumsey Map Collection](https://www.davidrumsey.com/). To get there, we take the following steps:

1. Convert [georeference data](https://purl.stanford.edu/ss311gz1992) from the David Rumsey Map Collection into [Georeference Annotations](https://iiif.io/api/extension/georef/).
2. Convert the [text detected with OCR](https://machines-reading-maps.github.io/rumsey/) produced by [mapKurator](https://knowledge-computing.github.io/mapkurator-doc/#/) into OCR Web Annotations and add the IIIF Image ID from the Georeference Annotations to this data.
3. Use [Allmaps](https://allmaps.org/) to turn the pixel coordinates of the text bounding boxes into GeoJSON.
4. Turn this GeoJSON into [PMTiles](https://docs.protomaps.com/pmtiles/) using [tippecanoe](https://github.com/felt/tippecanoe).
5. Visualize this data in a web application built with [SvelteKit](https://svelte.dev/docs/kit/introduction) and [MapLibre GL JS
   ](https://maplibre.org/).

This repository contains the following directories:

- [`etl`](etl): ETL scripts to transform and export the required data.
- ['app`](app): Web application to visualize the data.
- [`data`](data): Input and output data.

## Getting Started

To run the scripts or app locally, first install the required dependencies:

```bash
pnpm install --recursive
```

Then, [run the ETL scripts](etl) to produce the required data (or download them from [Zenodo](https://zenodo.org/uploads/15316188)) and [build the web application](app).

## Prerequisites

Software:

- Node.js v23.1.0 or higher
- pnpm v10.10.0 or higher

Required input data:

- `./data/input/rumsey_57k_english.zip` (**warning**: This is 51 GB file!)
- `./data/input/maps.ndjson`, produced by https://github.com/allmaps/rumsey-scripts.

See the [`etl`](etl) directory for more details.
