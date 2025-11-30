<script lang="ts">
  import { setFeaturesState } from '$lib/state/features.svelte.js'

  import '../app.css'
  import '@allmaps/components/css/fonts.css'

  let { children } = $props()

  setFeaturesState()
</script>

{@render children()}
