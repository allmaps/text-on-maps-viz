import { setContext, getContext } from 'svelte'

import type { MapGeoJSONFeature } from 'maplibre-gl'

const FEATURES_KEY = Symbol('features')

export class FeaturesState {
  #features = $state<MapGeoJSONFeature[]>([])

  set features(features: MapGeoJSONFeature[] | undefined) {
    this.#features = features || []
  }

  get features(): MapGeoJSONFeature[] {
    return this.#features || []
  }
}

export function setFeaturesState() {
  return setContext(FEATURES_KEY, new FeaturesState())
}

export function getFeaturesState() {
  const featuresState = getContext<ReturnType<typeof setFeaturesState>>(FEATURES_KEY)

  if (!featuresState) {
    throw new Error('FeaturesState is not set')
  }

  return featuresState
}
