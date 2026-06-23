export * from './categories'
export * from './types'
export * from './ingredients'

import type { BlockEntry } from './types'
import { functionalBlocks } from './blocks.functional'
import { furnitureBlocks } from './blocks.furniture'
import { toolBlocks } from './blocks.tools'
import { containerBlocks } from './blocks.containers'
import { plantBlocks } from './blocks.plants'
import { decorationBlocks } from './blocks.decoration'
import { lightingBlocks } from './blocks.lighting'
import { otherBlocks } from './blocks.other'

export const allBlocks: BlockEntry[] = [
  ...functionalBlocks,
  ...furnitureBlocks,
  ...toolBlocks,
  ...containerBlocks,
  ...plantBlocks,
  ...decorationBlocks,
  ...lightingBlocks,
  ...otherBlocks,
]
