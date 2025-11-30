<script lang="ts">
  import type { GeoreferencedMap } from '@allmaps/annotation'

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
    colors: ColorConfig[]
  }

  let { collections = $bindable<Collection[]>([]), colors = [] }: Props = $props()

  function toggleCollection(index: number) {
    collections[index].enabled = !collections[index].enabled
  }

  function getColor(pubListNo: string): string {
    return colors.find((c) => c.pubListNo === pubListNo)?.color ?? '#999'
  }
</script>

<div class="p-2">
  <h3 class="mb-2 font-semibold">Collections</h3>
  <ul class="flex flex-col gap-1">
    {#each collections as collection, index}
      <li class="flex items-center gap-2">
        <input
          type="checkbox"
          checked={collection.enabled}
          onchange={() => toggleCollection(index)}
          class="cursor-pointer"
          style="accent-color: {getColor(collection.pubListNo)}"
        />
        <span
          class="aspect-square h-3 w-3 rounded-full"
          style="background-color: {getColor(collection.pubListNo)}"
        ></span>
        <span class="text-sm">{collection.title}</span>
        <span class="text-xs text-gray-500">({collection.maps.length})</span>
      </li>
    {/each}
  </ul>
</div>
