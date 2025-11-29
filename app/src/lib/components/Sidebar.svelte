<script lang="ts">
  import Collections from '$lib/components/Collections.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import Options from '$lib/components/Options.svelte'
  import Search from '$lib/components/Search.svelte'
  import Selected from '$lib/components/Selected.svelte'

  import type { GeoreferencedMap } from '@allmaps/annotation'
  import type { LngLatBoundsLike } from 'maplibre-gl'

  type BasemapStyle = 'default' | 'labels' | 'none'

  type CollectionMap = {
    pubListNo: string
    listNo: string
    allmapsImageId: string
    map: GeoreferencedMap
  }

  type Collection = {
    title: string
    pubListNo: string
    maps: CollectionMap[]
    enabled: boolean
  }

  type ColorConfig = {
    pubListNo: string
    color: string
    textColor: string
  }

  let {
    collections = $bindable<Collection[]>([]),
    yearRange = $bindable<[number, number]>([1756, 1953]),
    basemapStyle = $bindable<BasemapStyle>('default'),
    fitBounds,
    colors = []
  }: {
    collections: Collection[]
    yearRange: [number, number]
    basemapStyle: BasemapStyle
    fitBounds: (bounds: LngLatBoundsLike) => void
    colors: ColorConfig[]
  } = $props()
</script>

<aside class="w-sm flex flex-col overflow-y-auto bg-white">
  <Selected {colors} />
  <Search {fitBounds} {colors} {collections} />
  <Collections bind:collections {colors} />
  <Filters bind:yearRange />
  <Options bind:basemapStyle />
</aside>
