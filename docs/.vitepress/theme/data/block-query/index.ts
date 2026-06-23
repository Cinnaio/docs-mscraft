export * from './categories'
export * from './types'
export * from './ingredients'
export * from './helpers'

import type { BlockEntry } from './types'
import { functionalBlocks } from './blocks.functional'
import { furnitureBlocks } from './blocks.furniture'
import { toolBlocks } from './blocks.tools'
import { containerBlocks } from './blocks.containers'
import { plantBlocks } from './blocks.plants'
import { ingredientBlocks } from './blocks.ingredients'
import { drinkBlocks } from './blocks.drinks'
import { decorationBlocks } from './blocks.decoration'
import { lightingBlocks } from './blocks.lighting'
import { otherBlocks } from './blocks.other'

export const allBlocks: BlockEntry[] = [
  ...functionalBlocks,
  ...furnitureBlocks,
  ...toolBlocks,
  ...containerBlocks,
  ...plantBlocks,
  ...ingredientBlocks,
  ...drinkBlocks,
  ...decorationBlocks,
  ...lightingBlocks,
  ...otherBlocks,
]
