<script lang="ts">
  import { onMount } from 'svelte'

  import { Map, addProtocol } from 'maplibre-gl'
  import { Protocol } from 'pmtiles'

  import { WarpedMapLayer } from '@allmaps/maplibre'
  import { pink, orange, blue, green, purple, red, shades } from '@allmaps/tailwind'

  import Sidebar from '$lib/components/Sidebar.svelte'

  import { getFeaturesState } from '$lib/state/features.svelte.js'

  import type { ExpressionSpecification, LngLatBoundsLike } from 'maplibre-gl'

  import 'maplibre-gl/dist/maplibre-gl.css'

  import type { GeoreferencedMap } from '@allmaps/annotation'

  interface CollectionMap {
    pubListNo: string
    listNo: string
    allmapsImageId: string
    map: GeoreferencedMap
  }

  interface Collection {
    title: string
    pubListNo: string
    maps: CollectionMap[]
    enabled: boolean
  }

  const featuresState = getFeaturesState()

  type BasemapStyle = 'default' | 'labels' | 'none'

  let mapLoaded = $state(false)
  let collections = $state<Collection[]>([])
  let yearRange = $state<[number, number]>([1756, 1953])
  let basemapStyle = $state<BasemapStyle>('default')
  let allmapsImageId = $state<string>()

  // Carto basemap label layer IDs to toggle
  const labelLayerIds = [
    'waterway_label',
    'watername_ocean',
    'watername_sea',
    'watername_lake',
    'watername_lake_line',
    'place_hamlet',
    'place_suburbs',
    'place_villages',
    'place_town',
    'place_country_2',
    'place_country_1',
    'place_state',
    'place_continent',
    'place_city_r6',
    'place_city_r5',
    'place_city_dot_r7',
    'place_city_dot_r4',
    'place_city_dot_r2',
    'place_city_dot_z7',
    'place_capital_dot_z7',
    'poi_stadium',
    'poi_park',
    'roadname_minor',
    'roadname_sec',
    'roadname_pri',
    'roadname_major',
    'housenumber'
  ]

  let labelsVisible = $state(false)

  function toggleLabelLayers(visible: boolean) {
    if (!map) return
    const visibility = visible ? 'visible' : 'none'
    for (const layerId of labelLayerIds) {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visibility)
      }
    }
    labelsVisible = visible
  }

  function toggleTextLabelLayer(visible: boolean) {
    if (!map) return
    const visibility = visible ? 'visible' : 'none'
    if (map.getLayer('ocr-lines-label')) {
      map.setLayoutProperty('ocr-lines-label', 'visibility', visibility)
    }
  }

  // const pmtilesUrl = 'http://127.0.0.1:8080/ocr.fantastic-futures.pmtiles'
  const pmtilesUrl =
    'https://pub-2f61d04756924d018146a9d59ae531ee.r2.dev/ocr.fantastic-futures.pmtiles'

  let container: HTMLElement
  let map: Map
  let warpedMapLayer: WarpedMapLayer

  const colors = [
    {
      // "Descriptive map of London poverty 1889"
      pubListNo: '11486.000',
      color: orange,
      textColor: shades.orange[1]
    },
    {
      // Carte de la France (1852-77)
      pubListNo: '13422.000',
      color: pink,
      textColor: shades.pink[1]
    },
    {
      // Carte de France (Cassini) (1750-1815)
      pubListNo: '5694.000',
      color: blue,
      textColor: shades.blue[1]
    },
    {
      // SF Sanborns (1905)
      pubListNo: '5850.000',
      color: green,
      textColor: shades.green[1]
    },
    {
      // Real Estate atlas of American and Canadian cities
      pubListNo: '12508.000',
      color: purple,
      textColor: shades.purple[1]
    },
    {
      // 18th c. American road map
      pubListNo: '2467.000',
      color: red,
      textColor: shades.red[1]
    }
  ]

  async function fetchCollections() {
    // Fetch collections from API
    const res = await fetch('/api/collections')
    const data = (await res.json()) as Collection[]
    collections = data.map((c: Omit<Collection, 'enabled'>) => ({ ...c, enabled: true }))
  }

  onMount(async () => {
    fetchCollections()

    const protocol = new Protocol()
    addProtocol('pmtiles', protocol.tile)

    map = new Map({
      container,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      // style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      // style: 'https://api.protomaps.com/styles/v5/light/en.json?key=ca7652ec836f269a',
      center: [2.679, 46.955],
      zoom: 6,
      maxPitch: 0,
      canvasContextAttributes: {
        preserveDrawingBuffer: true
      },
      hash: true
    })
    map.on('load', () => {
      const colorMatch = Object.values(colors)
        .map(({ pubListNo, color }) => [pubListNo, color])
        .flat()

      const textColorMatch = Object.values(colors)
        .map(({ pubListNo, textColor }) => [pubListNo, textColor])
        .flat()

      // @ts-ignore - Dynamic match expression is valid MapLibre expression
      const colorExpression: ExpressionSpecification = [
        'match',
        ['get', 'pubListNo'],
        ...colorMatch,
        '#fff'
      ]

      // @ts-ignore - Dynamic match expression is valid MapLibre expression
      const textColorExpression: ExpressionSpecification = [
        'match',
        ['get', 'pubListNo'],
        ...textColorMatch,
        '#fff'
      ]

      warpedMapLayer = new WarpedMapLayer()
      // @ts-expect-error incompatible types
      map.addLayer(warpedMapLayer)
      map.addSource('ocr', {
        type: 'vector',
        url: `pmtiles://${pmtilesUrl}`
      })
      map.addLayer({
        id: 'ocr-polygons',
        type: 'fill',
        source: 'ocr',
        'source-layer': 'ocr-polygons',
        paint: {
          'fill-color': colorExpression,
          'fill-opacity': [
            'case',
            ['==', ['get', 'insideMapMask'], false],
            ['literal', 0.02],
            ['literal', 0.1]
          ]
        }
      })
      map.addLayer({
        id: 'ocr-polygons-line',
        type: 'line',
        source: 'ocr',
        'source-layer': 'ocr-polygons',
        paint: {
          'line-color': colorExpression,
          'line-opacity': 0.7,
          'line-dasharray': [
            'case',
            ['==', ['get', 'insideMapMask'], false],
            ['literal', [5, 5]],
            ['literal', [1, 0]]
          ]
        }
      })

      // map.addLayer({
      //   id: 'ocr-lines',
      //   type: 'line',
      //   source: 'ocr',
      //   'source-layer': 'ocr-lines',
      //   paint: {
      //     'line-color': colorExpression,
      //     'line-opacity': 0.2,
      //     'line-width': 3
      //   }
      // })

      map.addLayer({
        id: 'ocr-lines-label',
        type: 'symbol',
        source: 'ocr',
        'source-layer': 'ocr-lines',
        layout: {
          'symbol-placement': 'line',
          'text-field': ['get', 'text'],
          'text-size': 14,
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular']
        },
        paint: {
          'text-color': textColorExpression,
          'text-halo-color': '#000',
          'text-halo-width': 2
        }
      })

      // Hide basemap label layers
      toggleLabelLayers(false)

      map.on('click', 'ocr-polygons', (event) => {
        if (map.getZoom() >= 10) {
          featuresState.features = event.features
        }
      })
      map.on('mouseenter', 'ocr-polygons', () => {
        if (map.getZoom() >= 10) {
          map.getCanvas().style.cursor = 'pointer'
        }
      })
      map.on('mouseleave', 'ocr-polygons', () => {
        map.getCanvas().style.cursor = 'default'
      })
      mapLoaded = true
    })
  })

  async function showGeoreferencedMap(allmapsImageId: string) {
    if (warpedMapLayer) {
      const georeferencedMapUrl = `api/annotations/images/${allmapsImageId}`
      const georeferencedMap = await fetch(georeferencedMapUrl).then((response) => response.json())

      warpedMapLayer.clear()
      await warpedMapLayer.addGeoreferencedMap(georeferencedMap)
    }
  }

  $effect(() => {
    if (mapLoaded && allmapsImageId) {
      showGeoreferencedMap(allmapsImageId)
    } else if (mapLoaded) {
      warpedMapLayer.clear()
    }
  })

  // OCR layer IDs that need filtering
  const ocrLayerIds = ['ocr-polygons', 'ocr-polygons-line', 'ocr-lines', 'ocr-lines-label']

  $effect(() => {
    if (mapLoaded && collections.length > 0) {
      const enabledPubListNos = collections.filter((c) => c.enabled).map((c) => c.pubListNo)

      // Combine pubListNo filter with year range filter
      const pubListNoFilter: ExpressionSpecification =
        enabledPubListNos.length > 0
          ? ['in', ['get', 'pubListNo'], ['literal', enabledPubListNos]]
          : ['==', 1, 0] // Hide all if none enabled

      const yearFilter: ExpressionSpecification = [
        'all',
        ['>=', ['get', 'year'], yearRange[0]],
        ['<=', ['get', 'year'], yearRange[1]]
      ]

      const combinedFilter: ExpressionSpecification = ['all', pubListNoFilter, yearFilter]

      for (const layerId of ocrLayerIds) {
        if (map.getLayer(layerId)) {
          map.setFilter(layerId, combinedFilter)
        }
      }
    }
  })

  function fitBounds(bounds: LngLatBoundsLike) {
    if (map) {
      map.fitBounds(bounds, { padding: 50, duration: 2000 })
    }
  }

  // Handle basemap style changes
  $effect(() => {
    if (!mapLoaded) return

    // Get all basemap layer IDs (non-OCR layers)
    const allLayers = map.getStyle().layers || []
    const basemapLayers = allLayers.filter(
      (layer) =>
        layer.id !== 'ocr-polygons' &&
        layer.id !== 'ocr-polygons-line' &&
        layer.id !== 'ocr-lines' &&
        layer.id !== 'ocr-lines-label' &&
        !layer.id.startsWith('allmaps')
    )

    if (basemapStyle === 'none') {
      // Hide all basemap layers
      for (const layer of basemapLayers) {
        map.setLayoutProperty(layer.id, 'visibility', 'none')
      }
    } else {
      // Show basemap layers
      for (const layer of basemapLayers) {
        map.setLayoutProperty(layer.id, 'visibility', 'visible')
      }
      // Toggle labels based on style
      toggleLabelLayers(basemapStyle === 'labels')
    }
  })

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code !== 'Space') return
    const target = event.target as HTMLElement
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
    event.preventDefault()
    toggleTextLabelLayer(false)
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.code !== 'Space') return
    const target = event.target as HTMLElement
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
    toggleTextLabelLayer(true)
  }
</script>

<svelte:body onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<div class="absolute flex h-full w-full flex-row">
  <div class="w-full bg-black" bind:this={container}></div>
  <Sidebar
    bind:allmapsImageId
    bind:collections
    bind:yearRange
    bind:basemapStyle
    {fitBounds}
    {colors}
  />
</div>
