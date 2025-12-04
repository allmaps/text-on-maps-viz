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
      class="outline-hidden fixed left-[50%] top-[50%] z-50 flex max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 overflow-auto rounded-lg border bg-white
      p-5 shadow sm:max-w-3xl md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
      >
        About
      </Dialog.Title>

      <p>
        This search interface shows data from a reformatted and filtered sample of the “text on
        maps" data for the <a class="underline" href="http://davidrumsey.com/"
          >David Rumsey Historical Map Collection</a
        >. This data was originally created by the
        <a class="underline" href="https://machines-reading-maps.github.io/"
          >Machines Reading Maps</a
        >
        project using mapkurator. The data (and related collection metadata) is openly available from
        the
        <a class="underline" href="https://searchworks.stanford.edu/view/rc349kh8402"
          >Stanford Digital Repository</a
        >. This prototype interface demonstrates early functionality for improving the re-usability
        of text spotting outputs. Sample data here is from the following sets of maps in the Rumsey
        collection:
      </p>

      <ul class="list-disc pl-6">
        <li>
          <a
            class="underline"
            href="https://www.davidrumsey.com/luna/servlet/view/search?q=pub_list_no%3d%225694.000%22&mi=0&qvq=sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1"
            >Carte de France (Cassini) (1750-1815)</a
          >
        </li>
        <li>
          <a
            class="underline"
            href="https://www.davidrumsey.com/luna/servlet/view/search?search=Submit&cat=0&q=pub_list_no%3D%2213422.000%22&dateRangeStart=&dateRangeEnd=&sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no"
            >Carte de la France</a
          > (1852-1877)
        </li>
        <li>
          <a
            class="underline"
            href="https://www.davidrumsey.com/luna/servlet/view/search?q=pub_list_no%3d%2211486.000%22&mi=0&qvq=sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1"
            >Descriptive map of London poverty</a
          > (1889)
        </li>
        <li>
          <a
            class="underline"
            href="https://www.davidrumsey.com/luna/servlet/view/search?search=Submit&cat=0&q=pub_list_no%3D%222467.000%22&dateRangeStart=&dateRangeEnd=&sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no"
            >A Survey of the Roads of the United States of America</a
          > (1789)
        </li>
        <li>
          <a
            class="underline"
            href="https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~213885~5501106:Title-Page--San-Francisco-Sanborn-I?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&mi=3&trs=378&qvq=q:pub_list_no%3D%225850.000%22;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1"
            >San Francisco Sanborn Insurance Map Atlas</a
          > (1905)
        </li>
        <li>
          <a
            class="underline"
            href="https://www.davidrumsey.com/luna/servlet/view/search?q=pub_list_no%3d%2212508.000%22&mi=0&qvq=sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1"
            >Preferred Business Real Estate Locations of the Principal Cities of the United States
            and Canada</a
          > (1929)
        </li>
      </ul>

      <p>The interface enables:</p>

      <ul class="list-disc pl-6">
        <li>Geospatial viewing for very large collections of text on maps data</li>
        <li>Text searching</li>
        <li>Time filtering</li>
        <li>Comparing groups of maps visually as separate layers</li>
        <li>Viewing original historical maps available as IIIF resource</li>
      </ul>

      <p>
        To create your own text on maps data, try the text spotting pipeline in
        <a
          class="underline"
          href="https://mapreader.readthedocs.io/en/latest/#mapreader-text-spotting-pipeline"
          >MapReader</a
        >.
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
