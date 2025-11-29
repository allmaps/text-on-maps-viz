<script lang="ts">
  import { onMount } from 'svelte'

  import { setFeaturesState } from '$lib/state/features.svelte.js'
  import { setWarpedMapState } from '$lib/state/warped-map.svelte.js'
  import { setFiltersState } from '$lib/state/filters.svelte.js'

  import '../app.css'
  import '@allmaps/components/css/fonts.css'

  let { children } = $props()

  setFeaturesState()
  setFiltersState()
  const warpedMapState = setWarpedMapState()

  onMount(() => {
    warpedMapState.fetch()
  })
</script>

{@render children()}
