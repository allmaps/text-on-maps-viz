<script lang="ts">
  import { Dialog } from 'bits-ui'
  import { X as XIcon } from 'phosphor-svelte'

  type Props = { open: boolean }

  let { open = $bindable() }: Props = $props()
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
    <Dialog.Content
      class="outline-hidden fixed left-[50%] top-[50%] z-50 flex w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg border bg-white p-5
      shadow sm:max-w-[490px] md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
      >
        About
      </Dialog.Title>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices
        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
      </p>

      <p class="font-light">
        For more information about Allmaps, see <a
          href="https://allmaps.org"
          target="_blank"
          class="underline">allmaps.org</a
        >.
      </p>

      <p class="font-light">
        The source code of this website and its data is available on <a
          href="https://github.com/allmaps/text-on-maps-viz"
          class="underline"
          target="_blank">GitHub</a
        >.
      </p>

      <Dialog.Close
        class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden absolute right-5 top-5 cursor-pointer rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <div>
          <XIcon class="text-foreground size-5" />
          <span class="sr-only">Close</span>
        </div>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
