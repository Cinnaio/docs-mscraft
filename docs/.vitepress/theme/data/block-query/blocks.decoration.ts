import type { BlockEntry } from './types'

export const decorationBlocks: BlockEntry[] = [
  {
      id: 'zisha-clay',
      icon: '/images/teastory/zisha_clay.png',
      nameZh: '紫砂泥',
      nameEn: 'Zisha Clay',
      categoryZh: '装饰方块',
      categoryEn: 'Decoration',
      descriptionZh: '稀有的紫色粘土，可用于制作紫砂壶和紫砂杯。',
      descriptionEn: 'Rare purple clay used for crafting zisha pots and cups.',
      obtainZh: '世界战利品箱掉落、与村民交易',
      obtainEn: 'World loot chests, villager trading',
      relatedIds: ['pot-zisha', 'zisha-clay-cup'],
    }
]
