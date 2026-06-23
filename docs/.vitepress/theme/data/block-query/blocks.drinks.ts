import type { BlockEntry } from './types'
import { emptyTeaBag } from './ingredients'
import { teastoryIcon, prop } from './helpers'

type TeaKind = {
  id: string
  nameZh: string
  nameEn: string
  effectZh: string
  effectEn: string
}

type CupMaterial = {
  id: string
  zh: string
  en: string
  replacementId: string
  replacementZh: string
  replacementEn: string
}

type KettleMaterial = {
  id: 'porcelain' | 'zisha'
  zh: string
  en: string
  emptyId: string
  replacementZh: string
  replacementEn: string
}

const teaKinds: TeaKind[] = [
  { id: 'black_tea', nameZh: '红茶', nameEn: 'Black Tea', effectZh: '力量，11 秒，等级 I', effectEn: 'Strength, 11s, level I' },
  { id: 'green_tea', nameZh: '绿茶', nameEn: 'Green Tea', effectZh: '急迫，13 秒，等级 I', effectEn: 'Haste, 13s, level I' },
  { id: 'lemon_tea', nameZh: '柠檬茶', nameEn: 'Lemon Tea', effectZh: '速度，12 秒，等级 I', effectEn: 'Speed, 12s, level I' },
  { id: 'matcha_drink', nameZh: '抹茶饮', nameEn: 'Matcha Drink', effectZh: '跳跃提升，10 秒，等级 II', effectEn: 'Jump Boost, 10s, level II' },
  { id: 'milk_tea', nameZh: '奶茶', nameEn: 'Milk Tea', effectZh: '抗性提升，11 秒，等级 I', effectEn: 'Resistance, 11s, level I' },
  { id: 'oolong_tea', nameZh: '乌龙茶', nameEn: 'Oolong Tea', effectZh: '水下呼吸，13 秒，等级 I', effectEn: 'Water Breathing, 13s, level I' },
  { id: 'puer_tea', nameZh: '普洱茶', nameEn: "Pu'er Tea", effectZh: '生命提升，12 秒，等级 I', effectEn: 'Health Boost, 12s, level I' },
  { id: 'white_tea', nameZh: '白茶', nameEn: 'White Tea', effectZh: '生命恢复，7 秒，等级 I', effectEn: 'Regeneration, 7s, level I' },
  { id: 'yellow_tea', nameZh: '黄茶', nameEn: 'Yellow Tea', effectZh: '伤害吸收，10 秒，等级 I', effectEn: 'Absorption, 10s, level I' },
]

const teaBagKinds = teaKinds.filter((tea) => !['lemon_tea', 'matcha_drink', 'milk_tea'].includes(tea.id))

const cupMaterials: CupMaterial[] = [
  { id: 'glass', zh: '玻璃杯', en: 'Glass', replacementId: 'cup-glass', replacementZh: '玻璃杯', replacementEn: 'Glass Cup' },
  { id: 'stone', zh: '石杯', en: 'Stone Cup', replacementId: 'cup-stone', replacementZh: '石杯', replacementEn: 'Stone Cup' },
  { id: 'wood', zh: '木杯', en: 'Wooden Cup', replacementId: 'cup-wood', replacementZh: '木茶杯', replacementEn: 'Wooden Tea Cup' },
  { id: 'porcelain', zh: '瓷杯', en: 'Porcelain Cup', replacementId: 'cup-porcelain', replacementZh: '瓷杯', replacementEn: 'Porcelain Cup' },
  { id: 'zisha', zh: '紫砂杯', en: 'Zisha Cup', replacementId: 'cup-zisha', replacementZh: '紫砂杯', replacementEn: 'Zisha Cup' },
]

const kettleMaterials: KettleMaterial[] = [
  { id: 'porcelain', zh: '瓷茶壶', en: 'Porcelain Kettle', emptyId: 'empty-porcelain-kettle', replacementZh: '空瓷茶壶', replacementEn: 'Empty Porcelain Kettle' },
  { id: 'zisha', zh: '紫砂茶壶', en: 'Zisha Kettle', emptyId: 'empty-zisha-kettle', replacementZh: '空紫砂茶壶', replacementEn: 'Empty Zisha Kettle' },
]

function foodDrink(entry: Omit<BlockEntry, 'categoryZh' | 'categoryEn'>): BlockEntry {
  return {
    categoryZh: '食物与饮品',
    categoryEn: 'Food & Drinks',
    ...entry,
  }
}

const teaBagEntries = teaBagKinds.map((tea) => {
  const leafEntryId = `${tea.id.replace(/_/g, '-')}-leaf`
  const residueEntryId = `${tea.id.replace(/_/g, '-')}-residue`
  return foodDrink({
    id: `${tea.id.replace(/_/g, '-')}-bag`,
    icon: teastoryIcon(`${tea.id}_bag`),
    nameZh: `${tea.nameZh}茶包`,
    nameEn: `${tea.nameEn} Bag`,
    descriptionZh: `装有 6 份${tea.nameZh}茶叶的茶包，泡制壶装${tea.nameZh}后返还${tea.nameZh}茶渣。`,
    descriptionEn: `Tea bag packed with 6 ${tea.nameEn} Leaves. Brewing ${tea.nameEn} kettle drinks returns ${tea.nameEn} Residue.`,
    obtainZh: `空茶包 + 6 ${tea.nameZh}茶叶 → 1 ${tea.nameZh}茶包（无序合成）。`,
    obtainEn: `Empty Tea Bag + 6 ${tea.nameEn} Leaves → 1 ${tea.nameEn} Bag (shapeless).`,
    aliasesZh: ['茶包', `${tea.nameZh}包`],
    aliasesEn: ['Tea Bag'],
    recipes: [
      {
        pattern: [
          emptyTeaBag, { nameZh: `${tea.nameZh}茶叶 ×6`, nameEn: `${tea.nameEn} Leaves ×6`, icon: teastoryIcon(`${tea.id}_leaf`), entryId: leafEntryId, count: 6 }, null,
          null, null, null,
          null, null, null,
        ],
        result: {
          nameZh: `${tea.nameZh}茶包`,
          nameEn: `${tea.nameEn} Bag`,
          entryId: `${tea.id.replace(/_/g, '-')}-bag`,
          icon: teastoryIcon(`${tea.id}_bag`),
        },
        noteZh: '实际配方为无序合成；此处仅作材料展示。',
        noteEn: 'Actual recipe is shapeless; the grid is only a material display.',
      },
    ],
    properties: [
      prop('配方类型', 'Recipe Type', '无序合成', 'shapeless'),
      prop('茶叶', 'Leaves', `6 × ${tea.nameZh}茶叶`, `6 × ${tea.nameEn} Leaves`),
      prop('泡壶返还', 'Brewing Remainder', `${tea.nameZh}茶渣`, `${tea.nameEn} Residue`),
    ],
    relatedIds: ['empty-tea-bag', leafEntryId, residueEntryId, `${tea.id.replace(/_/g, '-')}-porcelain-kettle`, `${tea.id.replace(/_/g, '-')}-zisha-kettle`],
  })
})

const cupDrinkEntries = teaKinds.flatMap((tea) => cupMaterials.map((material) => foodDrink({
  id: `${tea.id.replace(/_/g, '-')}-${material.id}`,
  icon: teastoryIcon(`${tea.id}_${material.id}`),
  nameZh: `${tea.nameZh}${material.zh}`,
  nameEn: `${material.en} of ${tea.nameEn}`,
  descriptionZh: `饮用后给予${tea.effectZh}，并返还${material.replacementZh}。`,
  descriptionEn: `Drinking grants ${tea.effectEn} and returns a ${material.replacementEn}.`,
  obtainZh: `由对应${tea.nameZh}茶壶饮品倒入${material.replacementZh}获得。`,
  obtainEn: `Obtained by pouring the matching ${tea.nameEn} kettle drink into a ${material.replacementEn}.`,
  aliasesZh: [`${tea.nameZh}杯`, `${tea.nameZh}饮品`, material.zh],
  aliasesEn: [`${tea.nameEn} Cup Drink`, `${material.replacementEn}`],
  properties: [
    prop('效果', 'Effect', tea.effectZh, tea.effectEn),
    prop('食物组件', 'Food', '营养值 5；饱和度 3.5；可随时饮用', 'nutrition 5; saturation 3.5; can always eat'),
    prop('饮用返还', 'Consume Replacement', material.replacementZh, material.replacementEn),
  ],
  relatedIds: [material.replacementId, `${tea.id.replace(/_/g, '-')}-porcelain-kettle`, `${tea.id.replace(/_/g, '-')}-zisha-kettle`],
})))

const kettleDrinkEntries = teaKinds.flatMap((tea) => kettleMaterials.map((material) => foodDrink({
  id: `${tea.id.replace(/_/g, '-')}-${material.id}-kettle`,
  icon: teastoryIcon(`${tea.id}_${material.id}_kettle`),
  nameZh: `${tea.nameZh}${material.zh}`,
  nameEn: `${material.en} of ${tea.nameEn}`,
  descriptionZh: `${material.zh}中的${tea.nameZh}，可继续配合茶杯制作杯装茶饮。`,
  descriptionEn: `${tea.nameEn} in a ${material.en}, used with cups to make cup tea drinks.`,
  obtainZh: `${tea.id === 'matcha_drink' ? '抹茶叶 + 茶筅' : `${tea.nameZh}茶包`} + 空${material.zh} + 烧开的水壶 → ${tea.nameZh}${material.zh}。`,
  obtainEn: `${tea.id === 'matcha_drink' ? 'Matcha Leaf + Tea Whisk' : `${tea.nameEn} Bag`} + Empty ${material.en} + Boiled Water Pot → ${material.en} of ${tea.nameEn}.`,
  aliasesZh: [`${tea.nameZh}壶`, `${tea.nameZh}茶壶`, material.zh],
  aliasesEn: [`${tea.nameEn} Kettle Drink`, material.en],
  properties: [
    prop('耐久', 'Max Damage', '4', '4'),
    prop('饮用返还', 'Consume Replacement', material.replacementZh, material.replacementEn),
    prop('合成返还', 'Craft Remainder', '返还茶壶并损耗 1 耐久', 'returns the kettle with 1 durability damage'),
  ],
  relatedIds: [material.emptyId, 'water-pot-stone', 'water-pot-porcelain', 'water-pot-iron', 'water-pot-zisha'],
})))

export const drinkBlocks: BlockEntry[] = [
  ...teaBagEntries,
  ...cupDrinkEntries,
  ...kettleDrinkEntries,
]
