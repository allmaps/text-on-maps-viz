<script lang="ts">
  import { Select } from 'bits-ui'

  type BasemapStyle = 'default' | 'labels' | 'none'

  type BasemapOptions = {
    value: BasemapStyle
    label: string
  }

  const basemapOptions: BasemapOptions[] = [
    { value: 'default', label: 'Default (no labels)' },
    { value: 'labels', label: 'With labels' },
    { value: 'none', label: 'No basemap (black)' }
  ]

  type Props = { basemapStyle: BasemapStyle }

  let { basemapStyle = $bindable<BasemapStyle>('default') }: Props = $props()

  function getLabel(value: string): string {
    return basemapOptions.find((o) => o.value === value)?.label ?? value
  }
</script>

<div class="flex flex-col gap-2 p-2">
  <h3 class="font-semibold">Options</h3>
  <div class="flex flex-col gap-1">
    <Select.Root
      type="single"
      value={basemapStyle}
      onValueChange={(value) => {
        if (value === 'default' || value === 'labels' || value === 'none') {
          basemapStyle = value
        }
      }}
    >
      <Select.Trigger
        class="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-2 py-1 text-sm"
      >
        {getLabel(basemapStyle)}
        <span class="text-gray-500">▼</span>
      </Select.Trigger>
      <Select.Content class="z-50 rounded border border-gray-300 bg-white shadow-lg">
        {#each basemapOptions as option}
          <Select.Item
            value={option.value}
            class="data-highlighted:bg-gray-100 cursor-pointer px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            {option.label}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
</div>
