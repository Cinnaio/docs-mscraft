import type { BlockEntry } from './types'
import { stick, bamboo, woodPlanks } from './ingredients'

export const toolBlocks: BlockEntry[] = [
  {
      id: 'wooden-mortar-pestle',
      icon: '/images/teastory/wooden_mortar_and_pestle.png',
      nameZh: '木制研钵研杵',
      nameEn: 'Wooden Mortar & Pestle',
      categoryZh: '工具',
      categoryEn: 'Tool',
      descriptionZh: '用于将青叶研磨成碎茶叶的基础工具，每次使用消耗 1 耐久。',
      descriptionEn: 'Basic tool for grinding tea leaves into broken tea. Consumes 1 durability per use.',
      obtainZh: '工作台合成',
      obtainEn: 'Crafted',
      properties: {
        耐久: '80',
        用途: '青叶 → 碎茶（1 青叶 → 3 碎茶）',
      },
      relatedIds: ['tea-whisk', 'tea-leaf'],
    },
  {
      id: 'tea-whisk',
      icon: '/images/teastory/tea_whisk.png',
      nameZh: '茶筅',
      nameEn: 'Tea Whisk',
      categoryZh: '工具',
      categoryEn: 'Tool',
      descriptionZh: '用于制作抹茶的工具，每次研磨消耗 1 耐久。',
      descriptionEn: 'Tool for preparing matcha. Consumes 1 durability per use.',
      obtainZh: '工作台合成',
      obtainEn: 'Crafted',
      recipes: [
        {
          pattern: [
            null, stick, null,
            bamboo, bamboo, bamboo,
            null, woodPlanks, null,
          ],
          result: {
            nameZh: '茶筅',
            nameEn: 'Tea Whisk',
            entryId: 'tea-whisk',
            icon: '/images/teastory/tea_whisk.png',
          },
          noteZh: '严格摆位；参与抹茶配方会损耗耐久。',
          noteEn: 'Shaped recipe. Preparing matcha consumes durability.',
        },
      ],
      properties: {
        耐久: '120',
        用途: '制作抹茶粉',
      },
      relatedIds: ['wooden-mortar-pestle'],
    },
  {
      id: 'sickle',
      icon: '/images/teastory/sickle.png',
      nameZh: '镰刀',
      nameEn: 'Sickle',
      categoryZh: '工具',
      categoryEn: 'Tool',
      descriptionZh: '用于收割水稻等作物，提高采收效率。',
      descriptionEn: 'Used for harvesting rice and other crops with improved efficiency.',
      obtainZh: '工作台合成',
      obtainEn: 'Crafted',
      properties: {
        工具类型: '剑/锄混合',
      },
      relatedIds: ['paddy-field'],
    }
]
