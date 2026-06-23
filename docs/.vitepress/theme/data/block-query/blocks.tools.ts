import type { BlockEntry } from './types'
import { bamboo, bowl, ironIngot, stick, woodPlanks } from './ingredients'

export const toolBlocks: BlockEntry[] = [
  {
    id: 'wooden-mortar-pestle',
    icon: '/images/teastory/wooden_mortar_and_pestle.png',
    nameZh: '木制研钵研杵',
    nameEn: 'Wooden Mortar & Pestle',
    categoryZh: '工具',
    categoryEn: 'Tool',
    descriptionZh: '用于研磨青叶等 TeaStory 原料的基础工具，参与指定配方时损耗耐久。',
    descriptionEn: 'Basic TeaStory processing tool used to grind tea ingredients; recipe use damages its durability.',
    obtainZh: '工作台合成（木棍 + 任意木板 + 碗）。',
    obtainEn: 'Crafted from a stick, any plank, and a bowl.',
    recipes: [
      {
        pattern: [
          null, stick, null,
          null, woodPlanks, null,
          null, bowl, null,
        ],
        result: {
          nameZh: '木制研钵研杵',
          nameEn: 'Wooden Mortar & Pestle',
          entryId: 'wooden-mortar-pestle',
          icon: '/images/teastory/wooden_mortar_and_pestle.png',
        },
        noteZh: '严格摆位；在 cgap:shapeless_mortar_tea 中作为配方返还物损耗 1 耐久。',
        noteEn: 'Shaped recipe. In cgap:shapeless_mortar_tea it returns as a damaged remainder (-1 durability).',
      },
    ],
    properties: {
      '材质 / Material': 'shears',
      '耐久 / Max Damage': '80',
      '配方返还 / Craft Remainder': 'hurt_and_break，damage 1（研磨茶叶配方）',
    },
    relatedIds: ['tea-leaf', 'xian-rice'],
  },
  {
    id: 'tea-whisk',
    icon: '/images/teastory/tea_whisk.png',
    nameZh: '茶筅',
    nameEn: 'Tea Whisk',
    categoryZh: '工具',
    categoryEn: 'Tool',
    descriptionZh: '用于将绿茶叶加工为抹茶叶的工具，参与抹茶配方时损耗耐久。',
    descriptionEn: 'Tool for preparing matcha leaves from green tea leaves; matcha recipes damage its durability.',
    obtainZh: '工作台合成（木棍 + 竹子 + 任意木板）。',
    obtainEn: 'Crafted from a stick, bamboo, and any plank.',
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
        noteZh: '严格摆位；在 cgap:shapeless_whisk_green_to_matcha 中作为配方返还物损耗 1 耐久。',
        noteEn: 'Shaped recipe. In cgap:shapeless_whisk_green_to_matcha it returns as a damaged remainder (-1 durability).',
      },
    ],
    properties: {
      '材质 / Material': 'shears',
      '耐久 / Max Damage': '120',
      '用途 / Use': '绿茶叶 → 抹茶叶',
      '配方返还 / Craft Remainder': 'hurt_and_break，damage 1（抹茶配方）',
    },
    relatedIds: ['tea-leaf', 'green-tea-porcelain', 'matcha-drink-porcelain-kettle'],
  },
  {
    id: 'sickle',
    icon: '/images/teastory/sickle.png',
    nameZh: '镰刀',
    nameEn: 'Sickle',
    categoryZh: '工具',
    categoryEn: 'Tool',
    descriptionZh: '铁锄材质的 TeaStory 镰刀，配置了 500 耐久。',
    descriptionEn: 'TeaStory sickle based on the iron hoe material, configured with 500 durability.',
    obtainZh: '工作台合成（3 铁锭 + 2 木棍）。',
    obtainEn: 'Crafted from 3 iron ingots and 2 sticks.',
    recipes: [
      {
        pattern: [
          null, ironIngot, ironIngot,
          ironIngot, stick, null,
          null, stick, null,
        ],
        result: {
          nameZh: '镰刀',
          nameEn: 'Sickle',
          entryId: 'sickle',
          icon: '/images/teastory/sickle.png',
        },
        noteZh: '严格摆位。',
        noteEn: 'Shaped recipe.',
      },
    ],
    properties: {
      '材质 / Material': 'iron_hoe',
      '耐久 / Max Damage': '500',
    },
    relatedIds: ['tea-seeds', 'item-xian-rice-seedling'],
  },
]
