<script lang="ts">
  import { Slider } from 'bits-ui'

  const MIN_YEAR = 1756
  const MAX_YEAR = 1953

  type Props = { yearRange: [number, number] }

  let { yearRange = $bindable<[number, number]>([MIN_YEAR, MAX_YEAR]) }: Props = $props()
</script>

<div class="flex flex-col gap-2 p-2">
  <h3 class="font-semibold">Filters</h3>
  <div class="flex flex-col gap-1">
    <span class="text-sm">
      Year range: {yearRange[0]} - {yearRange[1]}
    </span>
    <Slider.Root
      type="multiple"
      bind:value={yearRange}
      min={MIN_YEAR}
      max={MAX_YEAR}
      step={1}
      class="relative flex w-full touch-none select-none items-center"
    >
      <Slider.Range class="absolute h-1 rounded-full bg-blue-500" />
      <Slider.Thumb
        index={0}
        class="block h-4 w-4 cursor-pointer rounded-full border border-gray-300 bg-white shadow"
      />
      <Slider.Thumb
        index={1}
        class="block h-4 w-4 cursor-pointer rounded-full border border-gray-300 bg-white shadow"
      />
    </Slider.Root>
  </div>
</div>
