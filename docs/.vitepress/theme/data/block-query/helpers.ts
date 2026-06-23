import type { BlockProperty } from './types'

export function teastoryIcon(id: string): string {
  return `/images/teastory/${id}.png`
}

export function prop(
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn: string,
): BlockProperty {
  return { labelZh, labelEn, valueZh, valueEn }
}
