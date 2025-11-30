<script lang="ts">
  import { getFeaturesState } from '$lib/state/features.svelte'
  import ResultItem from '$lib/components/ResultItem.svelte'

  type ColorConfig = {
    pubListNo: string
    color: string
    textColor: string
  }

  type Props = { colors: ColorConfig[]; allmapsImageId: string | undefined }

  let { colors = [], allmapsImageId = $bindable<string | undefined>() }: Props = $props()

  const featuresState = getFeaturesState()
</script>

<div class="flex flex-col gap-2 p-2">
  <h3 class="font-semibold">Selected</h3>
  {#if featuresState.features.length === 0}
    <p class="text-sm text-gray-500">No features selected</p>
  {:else}
    <ol class="flex flex-col gap-1">
      {#each featuresState.features as feature}
        <li>
          <ResultItem
            bind:allmapsImageId
            result={{
              text: feature.properties.text,
              pubListNo: feature.properties.pubListNo,
              allmapsImageId: feature.properties.allmapsImageId
            }}
            {colors}
          />
        </li>
      {/each}
    </ol>
  {/if}
</div>
