import { setContext, getContext } from 'svelte'

const FILTERS_KEY = Symbol('filters')

export class FiltersState {}

export function setFiltersState() {
  return setContext(FILTERS_KEY, new FiltersState())
}

export function getFiltersState() {
  const filtersState = getContext<ReturnType<typeof setFiltersState>>(FILTERS_KEY)

  if (!filtersState) {
    throw new Error('FeaturesState is not set')
  }

  return filtersState
}
