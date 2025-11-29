<script lang="ts">
  import type { LngLatBoundsLike } from 'maplibre-gl'
  import { getWarpedMapState } from '$lib/state/warped-map.svelte'

  interface ColorConfig {
    pubListNo: string
    color: string
    textColor: string
  }

  interface ResultData {
    text: string
    pubListNo: string
    allmapsImageId: string
    bbox?: [number, number, number, number] | null
  }

  let {
    result,
    colors = [],
    fitBounds
  }: {
    result: ResultData
    colors: ColorConfig[]
    fitBounds?: (bounds: LngLatBoundsLike) => void
  } = $props()

  const warpedMapState = getWarpedMapState()

  function getColor(pubListNo: string): string {
    return colors.find((c) => c.pubListNo === pubListNo)?.color ?? '#999'
  }

  function showWarpedMap() {
    warpedMapState.allmapsImageId = result.allmapsImageId
  }

  function goToLocation() {
    if (result.bbox && fitBounds) {
      fitBounds([
        [result.bbox[0], result.bbox[1]],
        [result.bbox[2], result.bbox[3]]
      ])
    }
  }
</script>

<div
  class="flex items-center gap-2 rounded px-2 py-1"
  style="border-left: 3px solid {getColor(result.pubListNo)}"
>
  <span class="h-2 w-2 shrink-0 rounded-full" style="background-color: {getColor(result.pubListNo)}"
  ></span>
  <span class="flex-1 text-sm">"{result.text}"</span>
  <div class="flex gap-1">
    {#if result.bbox && fitBounds}
      <button
        onclick={goToLocation}
        class="cursor-pointer rounded px-2 py-0.5 text-xs text-white shadow"
        style="background-color: {getColor(result.pubListNo)}"
      >
        Go to
      </button>
    {/if}
    <button
      onclick={showWarpedMap}
      class="cursor-pointer rounded px-2 py-0.5 text-xs text-white shadow"
      style="background-color: {getColor(result.pubListNo)}"
    >
      Show map
    </button>
  </div>
</div>
