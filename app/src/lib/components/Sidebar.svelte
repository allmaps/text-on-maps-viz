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

  type Props = {
    collections: Collection[]
    yearRange: [number, number]
    basemapStyle: BasemapStyle
    fitBounds: (bounds: LngLatBoundsLike) => void
    colors: ColorConfig[]
    allmapsImageId: string | undefined
    showAbout: boolean
  }

  let {
    collections = $bindable<Collection[]>([]),
    yearRange = $bindable<[number, number]>([1756, 1953]),
    basemapStyle = $bindable<BasemapStyle>('default'),
    fitBounds,
    colors = [],
    allmapsImageId = $bindable<string | undefined>(),
    showAbout = $bindable<boolean>(false)
  }: Props = $props()
</script>

<aside class="sm:w-xs flex h-1/2 w-full shrink-0 flex-col overflow-y-auto bg-white sm:h-full">
  <div class="flex flex-row justify-between gap-2 p-2">
    <h1 class="text-2xl font-bold">Text on Maps</h1>
    <button onclick={() => (showAbout = true)} class="cursor-pointer underline">About</button>
  </div>

  <Selected {colors} bind:allmapsImageId />
  <Search {fitBounds} {colors} {collections} bind:allmapsImageId />
  <Collections bind:collections {colors} />
  <Filters bind:yearRange />
  <Options bind:basemapStyle />
</aside>
