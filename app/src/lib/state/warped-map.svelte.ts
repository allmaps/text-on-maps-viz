import { setContext, getContext } from 'svelte'

import { parseAnnotation } from '@allmaps/annotation'

import {
  fetchGeoreferenceAnnotationsIndex,
  fetchGeoreferenceAnnotation,
  type GeoreferenceAnnotationsIndex
} from '$lib/shared/georeference-annotations.js'

import type { GeoreferencedMap } from '@allmaps/annotation'

const WARPED_MAP_KEY = Symbol('warped-map')

export class WarpedMapState {
  #georeferenceAnnotationsIndex = $state.raw<GeoreferenceAnnotationsIndex>()

  #allmapsImageId = $state<string>()

  #georeferencedMap = $state.raw<GeoreferencedMap>()

  constructor() {
    $effect(() => {
      if (this.#georeferenceAnnotationsIndex && this.#allmapsImageId) {
        const indexItem = this.#georeferenceAnnotationsIndex.get(this.#allmapsImageId)
        if (indexItem) {
          fetchGeoreferenceAnnotation(indexItem).then((annotation) => {
            const maps = parseAnnotation(annotation)
            this.#georeferencedMap = maps[0]
          })
        }
      }
    })
  }

  async fetch() {
    const index = await fetchGeoreferenceAnnotationsIndex()
    this.#georeferenceAnnotationsIndex = index
  }

  set allmapsImageId(allmapsImageId: string | undefined) {
    this.#allmapsImageId = allmapsImageId
  }

  get allmapsImageId() {
    return this.#allmapsImageId
  }

  get georeferencedMap() {
    return this.#georeferencedMap
  }
}

export function setWarpedMapState() {
  return setContext(WARPED_MAP_KEY, new WarpedMapState())
}

export function getWarpedMapState() {
  const warpedMapState = getContext<ReturnType<typeof setWarpedMapState>>(WARPED_MAP_KEY)

  if (!warpedMapState) {
    throw new Error('WarpedMapState is not set')
  }

  return warpedMapState
}
