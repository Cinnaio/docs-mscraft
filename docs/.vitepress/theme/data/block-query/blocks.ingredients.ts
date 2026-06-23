import type { BlockEntry, ProcessRecipe, RecipeItem } from './types'
import { wheat } from './ingredients'
import { method, processIngredient, processRecipe, prop, teastoryIcon, teastoryItem } from './helpers'

type IngredientEntry = Pick<BlockEntry, 'id' | 'icon' | 'nameZh' | 'nameEn' | 'descriptionZh' | 'descriptionEn' | 'obtainZh' | 'obtainEn' | 'aliasesZh' | 'aliasesEn' | 'properties' | 'recipes' | 'processes' | 'relatedIds'>

function teaIngredient(entry: IngredientEntry): BlockEntry {
  return {
    categoryZh: '茶材原料',
    categoryEn: 'Tea Ingredients',
    ...entry,
  }
}

function entryIdFromTexture(textureId: string): string {
  return textureId.replace(/_/g, '-')
}

function ingredientItem(textureId: string, nameZh: string, nameEn: string, options: Omit<RecipeItem, 'nameZh' | 'nameEn' | 'icon'> = {}): RecipeItem {
  return teastoryItem(textureId, nameZh, nameEn, {
    entryId: entryIdFromTexture(textureId),
    ...options,
  })
}

const mortar = ingredientItem('wooden_mortar_and_pestle', '木制研钵研杵', 'Wooden Mortar & Pestle', { entryId: 'wooden-mortar-pestle' })
const teaWhisk = ingredientItem('tea_whisk', '茶筅', 'Tea Whisk', { entryId: 'tea-whisk' })
const bakingPowder = ingredientItem('baking_powder', '发酵粉', 'Baking Powder / Fermentation Powder', { entryId: 'baking-powder' })
const teaLeaf = ingredientItem('tea_leaf', '青叶', 'Green Leaf', { entryId: 'tea-leaf' })
const brokenTeaLeaf = ingredientItem('broken_tea_leaf', '碎茶', 'Broken Tea Leaf', { entryId: 'broken-tea-leaf' })
const dryingMethods = [
  method('campfire_cooking', { timeTicks: 400, experience: 0.1 }),
  method('smelting', { timeTicks: 200, experience: 0.1 }),
  method('smoking', { timeTicks: 100, experience: 0.1 }),
  method('blasting', { timeTicks: 100, experience: 0.1 }),
]

function witheringProcess(input: RecipeItem, result: RecipeItem, timeTicks: number, experience: number): ProcessRecipe[] {
  return [processRecipe(
    method('campfire_cooking', { timeTicks, experience }),
    [processIngredient(input)],
    result,
    {
      id: `campfire-${input.entryId}-to-${result.entryId}`,
      noteZh: '通过营火萎凋鲜叶获得。',
      noteEn: 'Withered from fresh tea material over a campfire.',
    },
  )]
}

const witheredToTeaProcesses: ProcessRecipe[] = [
  processRecipe(
    method('smelting', { timeTicks: 160, experience: 0.6 }),
    [processIngredient(ingredientItem('withered_tea_leaf_bud', '萎凋叶（品质：单芽）', 'Withered Single Bud', { entryId: 'withered-tea-leaf-bud' }))],
    ingredientItem('tea_leaf', '青叶', 'Green Leaf', { entryId: 'tea-leaf', count: 2 }),
  ),
  processRecipe(
    method('smelting', { timeTicks: 180, experience: 0.5 }),
    [processIngredient(ingredientItem('withered_tea_leaf_bud_leaf1', '萎凋叶（品质：一芽一叶）', 'Withered One Bud One Leaf', { entryId: 'withered-tea-leaf-bud-leaf1' }))],
    ingredientItem('tea_leaf', '青叶', 'Green Leaf', { entryId: 'tea-leaf', count: 2 }),
  ),
  processRecipe(
    method('smelting', { timeTicks: 200, experience: 0.4 }),
    [processIngredient(ingredientItem('withered_tea_leaf_bud_leaf2', '萎凋叶（品质：一芽二叶）', 'Withered One Bud Two Leaves', { entryId: 'withered-tea-leaf-bud-leaf2' }))],
    teaLeaf,
  ),
  processRecipe(
    method('smelting', { timeTicks: 220, experience: 0.3 }),
    [processIngredient(ingredientItem('withered_tea_leaf_bud_leaf3', '萎凋叶（品质：一芽三叶）', 'Withered One Bud Three Leaves', { entryId: 'withered-tea-leaf-bud-leaf3' }))],
    teaLeaf,
  ),
  processRecipe(
    method('smelting', { timeTicks: 240, experience: 0.2 }),
    [processIngredient(ingredientItem('withered_tea_leaf_old_leaf', '萎凋叶（品质：老叶）', 'Withered Old Leaf', { entryId: 'withered-tea-leaf-old-leaf' }))],
    teaLeaf,
  ),
]

function processedLeafProcesses(id: string): ProcessRecipe[] | undefined {
  if (id === 'tea-leaf') return witheredToTeaProcesses
  if (id === 'broken-tea-leaf') {
    return [processRecipe(
      method('shapeless'),
      [processIngredient(mortar), processIngredient(teaLeaf)],
      ingredientItem('broken_tea_leaf', '碎茶', 'Broken Tea Leaf', { entryId: 'broken-tea-leaf', count: 3 }),
      {
        id: 'shapeless-mortar-tea',
        returns: [mortar],
        noteZh: '实际配方为无序合成；研钵研杵作为配方返还物返还并损耗 1 耐久。',
        noteEn: 'Actual recipe is shapeless. The mortar and pestle returns as a damaged recipe remainder (-1 durability).',
      },
    )]
  }
  if (id === 'matcha-tea-leaf') {
    return [processRecipe(
      method('shapeless'),
      [processIngredient(teaWhisk), processIngredient(ingredientItem('green_tea_leaf', '绿茶茶叶', 'Green Tea Leaf', { entryId: 'green-tea-leaf' }))],
      ingredientItem('matcha_tea_leaf', '抹茶叶', 'Matcha Leaf', { entryId: 'matcha-tea-leaf' }),
      {
        id: 'shapeless-whisk-green-to-matcha',
        returns: [teaWhisk],
        noteZh: '实际配方为无序合成；茶筅作为配方返还物返还并损耗 1 耐久。',
        noteEn: 'Actual recipe is shapeless. The tea whisk returns as a damaged recipe remainder (-1 durability).',
      },
    )]
  }
  if (id === 'semi-fermented-tea-leaf') {
    return [processRecipe(method('brewing'), [processIngredient(bakingPowder, { roleZh: '发酵材料', roleEn: 'Fermentation ingredient' }), processIngredient(brokenTeaLeaf, { roleZh: '被发酵茶叶', roleEn: 'Fermented container item' })], ingredientItem('semi_fermented_tea_leaf', '半发酵茶', 'Semi Fermented Tea Leaf', { entryId: 'semi-fermented-tea-leaf' }))]
  }
  if (id === 'fully-fermented-tea-leaf') {
    return [processRecipe(method('brewing'), [processIngredient(bakingPowder, { roleZh: '发酵材料', roleEn: 'Fermentation ingredient' }), processIngredient(ingredientItem('semi_fermented_tea_leaf', '半发酵茶', 'Semi Fermented Tea Leaf', { entryId: 'semi-fermented-tea-leaf' }), { roleZh: '被发酵茶叶', roleEn: 'Fermented container item' })], ingredientItem('fully_fermented_tea_leaf', '全发酵茶', 'Fully Fermented Tea Leaf', { entryId: 'fully-fermented-tea-leaf' }))]
  }
  if (id === 'deep-fermented-tea-leaf') {
    return [processRecipe(method('brewing'), [processIngredient(bakingPowder, { roleZh: '发酵材料', roleEn: 'Fermentation ingredient' }), processIngredient(ingredientItem('fully_fermented_tea_leaf', '全发酵茶', 'Fully Fermented Tea Leaf', { entryId: 'fully-fermented-tea-leaf' }), { roleZh: '被发酵茶叶', roleEn: 'Fermented container item' })], ingredientItem('deep_fermented_tea_leaf', '重发酵茶', 'Deep Fermented Tea Leaf', { entryId: 'deep-fermented-tea-leaf' }))]
  }
  if (id === 'green-tea-leaf') return [processRecipe(dryingMethods, [processIngredient(brokenTeaLeaf)], ingredientItem('green_tea_leaf', '绿茶茶叶', 'Green Tea Leaf', { entryId: 'green-tea-leaf' }))]
  if (id === 'oolong-tea-leaf') return [processRecipe(dryingMethods, [processIngredient(ingredientItem('semi_fermented_tea_leaf', '半发酵茶', 'Semi Fermented Tea Leaf', { entryId: 'semi-fermented-tea-leaf' }))], ingredientItem('oolong_tea_leaf', '乌龙茶茶叶', 'Oolong Tea Leaf', { entryId: 'oolong-tea-leaf' }))]
  if (id === 'black-tea-leaf') return [processRecipe(dryingMethods, [processIngredient(ingredientItem('fully_fermented_tea_leaf', '全发酵茶', 'Fully Fermented Tea Leaf', { entryId: 'fully-fermented-tea-leaf' }))], ingredientItem('black_tea_leaf', '红茶茶叶', 'Black Tea Leaf', { entryId: 'black-tea-leaf' }))]
  if (id === 'puer-tea-leaf') return [processRecipe(dryingMethods, [processIngredient(ingredientItem('deep_fermented_tea_leaf', '重发酵茶', 'Deep Fermented Tea Leaf', { entryId: 'deep-fermented-tea-leaf' }))], ingredientItem('puer_tea_leaf', '普洱茶茶叶', "Pu'er Tea Leaf", { entryId: 'puer-tea-leaf' }))]

  return undefined
}

const freshLeafEntries: BlockEntry[] = [
  teaIngredient({
    id: 'fresh-tea-leaf',
    icon: teastoryIcon('fresh_tea_leaf'),
    nameZh: '鲜叶',
    nameEn: 'Fresh Leaf',
    descriptionZh: '茶树成熟后采集的通用鲜叶，是制茶流程的起点。',
    descriptionEn: 'Generic fresh leaf harvested from mature tea crops, the starting point of tea processing.',
    obtainZh: '成熟茶树作物 age 6 掉落。',
    obtainEn: 'Dropped by mature age-6 tea crops.',
    aliasesZh: ['茶叶鲜叶', '茶树掉落'],
    aliasesEn: ['Tea fresh leaf', 'Tea crop loot'],
    relatedIds: ['tea-seeds', 'withered-tea-leaf', 'tea-leaf'],
  }),
  teaIngredient({
    id: 'fresh-tea-leaf-bud',
    icon: teastoryIcon('fresh_tea_leaf_bud'),
    nameZh: '鲜叶（品质：单芽）',
    nameEn: 'Single Bud',
    descriptionZh: '茶树最嫩的芽头；成熟茶树掉落权重 5。',
    descriptionEn: 'Tender tea bud. Mature tea crop loot weight: 5.',
    obtainZh: '成熟茶树作物 age 6 按权重掉落。',
    obtainEn: 'Weighted drop from mature age-6 tea crops.',
    aliasesZh: ['鲜叶单芽', '单芽'],
    aliasesEn: ['Fresh Single Bud'],
    relatedIds: ['tea-seeds', 'withered-tea-leaf-bud'],
  }),
  teaIngredient({
    id: 'fresh-tea-leaf-bud-leaf1',
    icon: teastoryIcon('fresh_tea_leaf_bud_leaf1'),
    nameZh: '鲜叶（品质：一芽一叶）',
    nameEn: 'One Bud One Leaf',
    descriptionZh: '初展的嫩芽与叶；成熟茶树掉落权重 15，数量 1~2。',
    descriptionEn: 'Tender bud with one leaf. Mature tea crop loot weight: 15, count 1-2.',
    obtainZh: '成熟茶树作物 age 6 按权重掉落。',
    obtainEn: 'Weighted drop from mature age-6 tea crops.',
    aliasesZh: ['鲜叶一芽一叶', '一芽一叶'],
    aliasesEn: ['Fresh One Bud One Leaf'],
    relatedIds: ['tea-seeds', 'withered-tea-leaf-bud-leaf1'],
  }),
  teaIngredient({
    id: 'fresh-tea-leaf-bud-leaf2',
    icon: teastoryIcon('fresh_tea_leaf_bud_leaf2'),
    nameZh: '鲜叶（品质：一芽二叶）',
    nameEn: 'One Bud Two Leaves',
    descriptionZh: '茶树鲜嫩叶片；成熟茶树掉落权重 25，数量 1~2。',
    descriptionEn: 'Fresh tender leaves. Mature tea crop loot weight: 25, count 1-2.',
    obtainZh: '成熟茶树作物 age 6 按权重掉落。',
    obtainEn: 'Weighted drop from mature age-6 tea crops.',
    aliasesZh: ['鲜叶一芽二叶', '一芽二叶'],
    aliasesEn: ['Fresh One Bud Two Leaves'],
    relatedIds: ['tea-seeds', 'withered-tea-leaf-bud-leaf2'],
  }),
  teaIngredient({
    id: 'fresh-tea-leaf-bud-leaf3',
    icon: teastoryIcon('fresh_tea_leaf_bud_leaf3'),
    nameZh: '鲜叶（品质：一芽三叶）',
    nameEn: 'One Bud Three Leaves',
    descriptionZh: '成熟的茶叶；成熟茶树掉落权重 30，数量 1~2。',
    descriptionEn: 'Mature tea leaves. Mature tea crop loot weight: 30, count 1-2.',
    obtainZh: '成熟茶树作物 age 6 按权重掉落。',
    obtainEn: 'Weighted drop from mature age-6 tea crops.',
    aliasesZh: ['鲜叶一芽三叶', '一芽三叶'],
    aliasesEn: ['Fresh One Bud Three Leaves'],
    relatedIds: ['tea-seeds', 'withered-tea-leaf-bud-leaf3'],
  }),
  teaIngredient({
    id: 'fresh-tea-leaf-old-leaf',
    icon: teastoryIcon('fresh_tea_leaf_old_leaf'),
    nameZh: '鲜叶（品质：老叶）',
    nameEn: 'Old Leaf',
    descriptionZh: '较为粗老的叶片；成熟茶树掉落权重 25，数量 1~2。',
    descriptionEn: 'Coarser old leaf. Mature tea crop loot weight: 25, count 1-2.',
    obtainZh: '成熟茶树作物 age 6 按权重掉落。',
    obtainEn: 'Weighted drop from mature age-6 tea crops.',
    aliasesZh: ['鲜叶老叶', '老叶'],
    aliasesEn: ['Fresh Old Leaf'],
    relatedIds: ['tea-seeds', 'withered-tea-leaf-old-leaf'],
  }),
]

const witheredLeafEntries: BlockEntry[] = [
  teaIngredient({
    id: 'withered-tea-leaf',
    icon: teastoryIcon('withered_tea_leaf'),
    nameZh: '萎凋叶',
    nameEn: 'Withered Tea Leaf',
    descriptionZh: '鲜叶经过萎凋流程后的通用茶叶。',
    descriptionEn: 'Generic tea leaf after the withering process.',
    obtainZh: '由鲜叶通过 TeaStory 萎凋/干燥流程获得。',
    obtainEn: 'Obtained from Fresh Leaf through the TeaStory withering/drying workflow.',
    aliasesZh: ['萎凋茶叶'],
    aliasesEn: ['Withered Leaf'],
    processes: witheringProcess(
      ingredientItem('wet_tea_leaf', '湿茶', 'Wet Tea Leaf', { entryId: 'wet-tea-leaf' }),
      ingredientItem('withered_tea_leaf', '萎凋叶', 'Withered Tea Leaf', { entryId: 'withered-tea-leaf' }),
      20,
      0.1,
    ),
    relatedIds: ['fresh-tea-leaf', 'tea-leaf'],
  }),
  teaIngredient({
    id: 'withered-tea-leaf-bud',
    icon: teastoryIcon('withered_tea_leaf_bud'),
    nameZh: '萎凋叶（品质：单芽）',
    nameEn: 'Withered Single Bud',
    descriptionZh: '单芽品质鲜叶萎凋后的产物。',
    descriptionEn: 'Withered product of the single-bud fresh leaf quality.',
    obtainZh: '由对应品质鲜叶萎凋获得。',
    obtainEn: 'Obtained by withering the matching fresh leaf quality.',
    processes: witheringProcess(
      ingredientItem('fresh_tea_leaf_bud', '鲜叶（品质：单芽）', 'Single Bud', { entryId: 'fresh-tea-leaf-bud' }),
      ingredientItem('withered_tea_leaf_bud', '萎凋叶（品质：单芽）', 'Withered Single Bud', { entryId: 'withered-tea-leaf-bud' }),
      200,
      0.5,
    ),
    relatedIds: ['fresh-tea-leaf-bud'],
  }),
  teaIngredient({
    id: 'withered-tea-leaf-bud-leaf1',
    icon: teastoryIcon('withered_tea_leaf_bud_leaf1'),
    nameZh: '萎凋叶（品质：一芽一叶）',
    nameEn: 'Withered One Bud One Leaf',
    descriptionZh: '一芽一叶品质鲜叶萎凋后的产物。',
    descriptionEn: 'Withered product of the one-bud-one-leaf fresh leaf quality.',
    obtainZh: '由对应品质鲜叶萎凋获得。',
    obtainEn: 'Obtained by withering the matching fresh leaf quality.',
    processes: witheringProcess(
      ingredientItem('fresh_tea_leaf_bud_leaf1', '鲜叶（品质：一芽一叶）', 'One Bud One Leaf', { entryId: 'fresh-tea-leaf-bud-leaf1' }),
      ingredientItem('withered_tea_leaf_bud_leaf1', '萎凋叶（品质：一芽一叶）', 'Withered One Bud One Leaf', { entryId: 'withered-tea-leaf-bud-leaf1' }),
      220,
      0.4,
    ),
    relatedIds: ['fresh-tea-leaf-bud-leaf1'],
  }),
  teaIngredient({
    id: 'withered-tea-leaf-bud-leaf2',
    icon: teastoryIcon('withered_tea_leaf_bud_leaf2'),
    nameZh: '萎凋叶（品质：一芽二叶）',
    nameEn: 'Withered One Bud Two Leaves',
    descriptionZh: '一芽二叶品质鲜叶萎凋后的产物。',
    descriptionEn: 'Withered product of the one-bud-two-leaves fresh leaf quality.',
    obtainZh: '由对应品质鲜叶萎凋获得。',
    obtainEn: 'Obtained by withering the matching fresh leaf quality.',
    processes: witheringProcess(
      ingredientItem('fresh_tea_leaf_bud_leaf2', '鲜叶（品质：一芽二叶）', 'One Bud Two Leaves', { entryId: 'fresh-tea-leaf-bud-leaf2' }),
      ingredientItem('withered_tea_leaf_bud_leaf2', '萎凋叶（品质：一芽二叶）', 'Withered One Bud Two Leaves', { entryId: 'withered-tea-leaf-bud-leaf2' }),
      240,
      0.3,
    ),
    relatedIds: ['fresh-tea-leaf-bud-leaf2'],
  }),
  teaIngredient({
    id: 'withered-tea-leaf-bud-leaf3',
    icon: teastoryIcon('withered_tea_leaf_bud_leaf3'),
    nameZh: '萎凋叶（品质：一芽三叶）',
    nameEn: 'Withered One Bud Three Leaves',
    descriptionZh: '一芽三叶品质鲜叶萎凋后的产物。',
    descriptionEn: 'Withered product of the one-bud-three-leaves fresh leaf quality.',
    obtainZh: '由对应品质鲜叶萎凋获得。',
    obtainEn: 'Obtained by withering the matching fresh leaf quality.',
    processes: witheringProcess(
      ingredientItem('fresh_tea_leaf_bud_leaf3', '鲜叶（品质：一芽三叶）', 'One Bud Three Leaves', { entryId: 'fresh-tea-leaf-bud-leaf3' }),
      ingredientItem('withered_tea_leaf_bud_leaf3', '萎凋叶（品质：一芽三叶）', 'Withered One Bud Three Leaves', { entryId: 'withered-tea-leaf-bud-leaf3' }),
      260,
      0.2,
    ),
    relatedIds: ['fresh-tea-leaf-bud-leaf3'],
  }),
  teaIngredient({
    id: 'withered-tea-leaf-old-leaf',
    icon: teastoryIcon('withered_tea_leaf_old_leaf'),
    nameZh: '萎凋叶（品质：老叶）',
    nameEn: 'Withered Old Leaf',
    descriptionZh: '老叶品质鲜叶萎凋后的产物。',
    descriptionEn: 'Withered product of the old-leaf fresh leaf quality.',
    obtainZh: '由对应品质鲜叶萎凋获得。',
    obtainEn: 'Obtained by withering the matching fresh leaf quality.',
    processes: witheringProcess(
      ingredientItem('fresh_tea_leaf_old_leaf', '鲜叶（品质：老叶）', 'Old Leaf', { entryId: 'fresh-tea-leaf-old-leaf' }),
      ingredientItem('withered_tea_leaf_old_leaf', '萎凋叶（品质：老叶）', 'Withered Old Leaf', { entryId: 'withered-tea-leaf-old-leaf' }),
      280,
      0.1,
    ),
    relatedIds: ['fresh-tea-leaf-old-leaf'],
  }),
]

const processedLeafData = [
  ['failed-fixation-tea-leaf', 'failed_fixation_tea_leaf', '焦叶', 'Failed Fixation Leaf', '杀青失败或相关流程产生的茶叶。', 'Leaf produced by failed fixation or related processing.'],
  ['wet-tea-leaf', 'wet_tea_leaf', '湿茶', 'Wet Tea Leaf', '制茶流程中的湿润茶叶中间产物。', 'Wet intermediate leaf in the TeaStory workflow.'],
  ['tea-leaf', 'tea_leaf', '青叶', 'Green Leaf', '基础青叶，可继续研磨或加工。', 'Basic green leaf for grinding or further processing.'],
  ['broken-tea-leaf', 'broken_tea_leaf', '碎茶', 'Broken Tea Leaf', '可由木制研钵研杵参与的研磨配方产生。', 'Produced by grinding workflows involving the Wooden Mortar & Pestle.'],
  ['black-tea-leaf', 'black_tea_leaf', '红茶茶叶', 'Black Tea Leaf', '用于制作红茶茶包。', 'Used to make Black Tea Bags.'],
  ['green-tea-leaf', 'green_tea_leaf', '绿茶茶叶', 'Green Tea Leaf', '用于制作绿茶茶包，也可进一步加工为抹茶叶。', 'Used to make Green Tea Bags and can be processed into Matcha Leaf.'],
  ['oolong-tea-leaf', 'oolong_tea_leaf', '乌龙茶茶叶', 'Oolong Tea Leaf', '用于制作乌龙茶包。', 'Used to make Oolong Tea Bags.'],
  ['puer-tea-leaf', 'puer_tea_leaf', '普洱茶茶叶', "Pu'er Tea Leaf", '用于制作普洱茶包。', "Used to make Pu'er Tea Bags."],
  ['white-tea-leaf', 'white_tea_leaf', '白茶茶叶', 'White Tea Leaf', '用于制作白茶包。', 'Used to make White Tea Bags.'],
  ['yellow-tea-leaf', 'yellow_tea_leaf', '黄茶茶叶', 'Yellow Tea Leaf', '用于制作黄茶包。', 'Used to make Yellow Tea Bags.'],
  ['matcha-tea-leaf', 'matcha_tea_leaf', '抹茶叶', 'Matcha Leaf', '由茶筅参与的抹茶流程获得，可用于抹茶饮。', 'Produced by the matcha workflow involving the Tea Whisk and used for Matcha Drink.'],
  ['deep-fermented-tea-leaf', 'deep_fermented_tea_leaf', '重发酵茶', 'Deep Fermented Tea Leaf', '发酵流程中的重发酵茶叶。', 'Deep-fermented leaf in the fermentation workflow.'],
  ['semi-fermented-tea-leaf', 'semi_fermented_tea_leaf', '半发酵茶', 'Semi Fermented Tea Leaf', '发酵流程中的半发酵茶叶。', 'Semi-fermented leaf in the fermentation workflow.'],
  ['fully-fermented-tea-leaf', 'fully_fermented_tea_leaf', '全发酵茶', 'Fully Fermented Tea Leaf', '发酵流程中的全发酵茶叶。', 'Fully fermented leaf in the fermentation workflow.'],
] as const

const processedLeafEntries = processedLeafData.map(([id, textureId, nameZh, nameEn, descriptionZh, descriptionEn]) => teaIngredient({
  id,
  icon: teastoryIcon(textureId),
  nameZh,
  nameEn,
  descriptionZh,
  descriptionEn,
  obtainZh: id === 'white-tea-leaf' || id === 'yellow-tea-leaf'
    ? '当前仅确认其可用于制作对应茶包；未在已检查 CraftEngine 配方中确认生产路线。'
    : '由鲜叶/萎凋叶经干燥、研磨、发酵、杀青等 TeaStory 配方流程获得。',
  obtainEn: id === 'white-tea-leaf' || id === 'yellow-tea-leaf'
    ? 'Confirmed as an ingredient for the matching tea bag; no production route was confirmed in the inspected CraftEngine recipes.'
    : 'Produced from fresh or withered leaves through TeaStory drying, grinding, fermentation, fixation, and related recipe workflows.',
  aliasesZh: ['加工茶叶', '制茶原料'],
  aliasesEn: ['Processed Tea Leaf', 'Tea ingredient'],
  processes: processedLeafProcesses(id),
  properties: id === 'white-tea-leaf' || id === 'yellow-tea-leaf'
    ? [prop('来源状态', 'Source Status', '未在已检查配方中确认', 'not confirmed in inspected recipes')]
    : undefined,
  relatedIds: ['wooden-mortar-pestle', 'tea-whisk', 'tea-bags'],
}))

const residueData = [
  ['black-tea-residue', 'black_tea_residue', '红茶茶渣', 'Black Tea Residue'],
  ['green-tea-residue', 'green_tea_residue', '绿茶茶渣', 'Green Tea Residue'],
  ['oolong-tea-residue', 'oolong_tea_residue', '乌龙茶茶渣', 'Oolong Tea Residue'],
  ['puer-tea-residue', 'puer_tea_residue', '普洱茶茶渣', "Pu'er Tea Residue"],
  ['white-tea-residue', 'white_tea_residue', '白茶茶渣', 'White Tea Residue'],
  ['yellow-tea-residue', 'yellow_tea_residue', '黄茶茶渣', 'Yellow Tea Residue'],
] as const

const residueEntries = residueData.map(([id, textureId, nameZh, nameEn]) => teaIngredient({
  id,
  icon: teastoryIcon(textureId),
  nameZh,
  nameEn,
  descriptionZh: `${nameZh}是对应茶包参与泡壶配方后的返还残渣。`,
  descriptionEn: `${nameEn} is the residue returned by the matching tea bag after kettle brewing recipes.`,
  obtainZh: '对应茶包参与茶壶配方时作为 recipe-based craft remainder 返还。',
  obtainEn: 'Returned as a recipe-based craft remainder when the matching tea bag is used in kettle recipes.',
  aliasesZh: ['茶渣', '泡茶返还物'],
  aliasesEn: ['Tea Residue', 'Brewing remainder'],
  properties: [
    prop('来源', 'Source', '茶包泡壶配方返还', 'returned from tea bag kettle-brewing recipes'),
    prop('用途', 'Use', '回收或后续 TeaStory 配方', 'recycling or later TeaStory recipes'),
  ],
  relatedIds: ['tea-bags', 'baking-powder'],
}))

export const ingredientBlocks: BlockEntry[] = [
  ...freshLeafEntries,
  ...witheredLeafEntries,
  ...processedLeafEntries,
  ...residueEntries,
  teaIngredient({
    id: 'baking-powder',
    icon: teastoryIcon('baking_powder'),
    nameZh: '发酵粉',
    nameEn: 'Baking Powder / Fermentation Powder',
    descriptionZh: '用于 TeaStory 发酵流程的材料；当前工具配方中可由两个小麦无序合成。',
    descriptionEn: 'Ingredient for the TeaStory fermentation workflow. Current tool recipes craft it shapelessly from two wheat.',
    obtainZh: '无序合成：2 小麦 → 1 发酵粉。',
    obtainEn: 'Shapeless crafting: 2 Wheat → 1 Baking Powder.',
    processes: [
      processRecipe(
        method('shapeless'),
        [processIngredient(wheat, { count: 2 })],
        bakingPowder,
        {
          id: 'shapeless-baking-powder-from-wheat',
          noteZh: '实际配方为无序合成，两个小麦即可制作发酵粉。',
          noteEn: 'Actual recipe is shapeless. Two wheat craft into fermentation powder.',
        },
      ),
      processRecipe(
        method('shapeless'),
        [processIngredient(residueData.map(([id, textureId, nameZh, nameEn]) => ingredientItem(textureId, nameZh, nameEn, { entryId: id })), {
          count: 2,
          roleZh: '任意茶渣',
          roleEn: 'Any tea residue',
        })],
        bakingPowder,
        {
          id: 'shapeless-tea-residue-to-baking-powder',
          noteZh: '任意两份红茶/绿茶/乌龙/普洱/白茶/黄茶茶渣均可回收为发酵粉。',
          noteEn: 'Any two black, green, oolong, pu’er, white, or yellow tea residues can be recycled into fermentation powder.',
        },
      ),
    ],
    properties: [
      prop('配方类型', 'Recipe Type', 'shapeless', 'shapeless'),
      prop('用途', 'Use', '发酵流程材料', 'fermentation workflow ingredient'),
    ],
    relatedIds: ['semi-fermented-tea-leaf', 'fully-fermented-tea-leaf', 'deep-fermented-tea-leaf'],
  }),
  teaIngredient({
    id: 'zisha-clay',
    icon: teastoryIcon('zisha_clay'),
    nameZh: '紫砂泥',
    nameEn: 'Zisha Clay',
    descriptionZh: '用于制作紫砂杯坯、紫砂罐坯和紫砂陶土茶壶的 TeaStory 材料。',
    descriptionEn: 'TeaStory material used for zisha cup bases, zisha jar blanks, and zisha clay kettles.',
    obtainZh: '工作台合成（黏土球、泥土、红沙 → 4 紫砂泥）。',
    obtainEn: 'Crafted from clay balls, dirt, and red sand → 4 Zisha Clay.',
    properties: [
      prop('配方摆位', 'Pattern', 'CDC / DRD / CDC', 'CDC / DRD / CDC'),
      prop('产物数量', 'Result Count', '4', '4'),
      prop('用途', 'Use', '紫砂杯、紫砂罐、紫砂茶壶坯', 'zisha cups, zisha jars, and zisha kettle blanks'),
    ],
    relatedIds: ['zisha-clay-cup', 'cup-zisha', 'pot-zisha-clay', 'pot-zisha', 'zisha-clay-kettle'],
  }),
]
