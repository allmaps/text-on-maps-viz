type StartEnd = {
  start: number
  end: number
}

type IndexItem = StartEnd & {
  allmapsImageId: string
}

export type GeoreferenceAnnotationsIndex = Map<string, StartEnd>

export async function fetchGeoreferenceAnnotationsIndex(): Promise<GeoreferenceAnnotationsIndex> {
  const index = await fetch('http://127.0.0.1:8080/georeference-annotations-index.json').then(
    (response) => response.json()
  )

  const indexMap = new Map<string, { start: number; end: number }>()

  index.forEach(({ start, end, allmapsImageId }: IndexItem) => {
    indexMap.set(allmapsImageId, { start, end })
  })

  return indexMap
}

export async function fetchGeoreferenceAnnotation({ start, end }: StartEnd): Promise<unknown> {
  const annotation = await fetch('http://127.0.0.1:8080/georeference-annotations.ndjson', {
    method: 'GET',
    headers: {
      Range: `bytes=${start}-${end}`
    }
  }).then((response) => response.json())

  return annotation
}
