<script lang="ts">
  import type { LngLatBoundsLike } from 'maplibre-gl'
  import ResultItem from '$lib/components/ResultItem.svelte'

  import type { GeoreferencedMap } from '@allmaps/annotation'

  interface SearchResult {
    id: string
    entryId: string
    imageId: string
    allmapsImageId: string
    text: string
    listNo: string
    pubListNo: string
    publisherLocation: string
    insideMapMask: boolean
    mapArea: number
    bbox: [number, number, number, number] | null
    rank: number
  }

  interface ColorConfig {
    pubListNo: string
    color: string
    textColor: string
  }

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

  let {
    fitBounds,
    colors = [],
    collections = []
  }: {
    fitBounds: (bounds: LngLatBoundsLike) => void
    colors: ColorConfig[]
    collections: Collection[]
  } = $props()

  let query = $state('')
  let results = $state<SearchResult[]>([])
  let loading = $state(false)

  async function search() {
    if (!query.trim()) {
      results = []
      return
    }

    const enabledPubListNos = collections.filter((c) => c.enabled).map((c) => c.pubListNo)
    if (enabledPubListNos.length === 0) {
      results = []
      return
    }

    loading = true
    try {
      const params = new URLSearchParams({
        query,
        pubListNos: enabledPubListNos.join(',')
      })
      const res = await fetch(`/api/search?${params}`)
      results = await res.json()
    } catch (e) {
      console.error('Search error:', e)
      results = []
    } finally {
      loading = false
    }
  }
</script>

<div class="flex flex-col gap-2 p-2">
  <h3 class="font-semibold">Seach OCR text</h3>
  <div class="flex gap-2">
    <input
      type="text"
      bind:value={query}
      onkeydown={(e) => e.key === 'Enter' && search()}
      placeholder="Search OCR text..."
      class="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
    />
    <button
      onclick={search}
      disabled={loading}
      class="cursor-pointer rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? '...' : 'Search'}
    </button>
  </div>

  {#if results.length > 0}
    <ul class="flex max-h-64 flex-col gap-1 overflow-y-auto">
      {#each results as result}
        <li>
          <ResultItem {result} {colors} {fitBounds} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
