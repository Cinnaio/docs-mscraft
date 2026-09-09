import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

// Snapshot the game's own names, recipes and textures; ordinary docs builds need no game checkout.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [resourceArg, materiaArg] = process.argv.slice(2)
if (!resourceArg || !materiaArg) throw new Error('Usage: node scripts/sync-teastory-guide.mjs <CraftEngine resources> <MateriaEngine config.yml>')
const resources = resolve(resourceArg, 'cgap')
const readYaml = (path) => parse(readFileSync(path, 'utf8'))
const config = join(resources, 'configuration')
const translations = readYaml(join(config, 'translations/teastory.yml')).translations
const categories = readYaml(join(config, 'categories.yml')).categories
const definitions = {}
for (const folder of ['items/teastory', 'blocks/teastory']) {
  for (const file of readdirSync(join(config, folder)).filter((name) => name.endsWith('.yml')).sort()) {
    Object.assign(definitions, readYaml(join(config, folder, file)).items)
  }
}
const vanillaNames = {
  planks: '任意木板', logs: '任意原木', oak_planks: '橡木木板', dark_oak_planks: '深色橡木木板',
  oak_log: '橡木原木', stick: '木棍', bowl: '碗', wheat: '小麦', sugar: '糖', egg: '鸡蛋',
  water_bucket: '水桶', milk_bucket: '牛奶桶', bucket: '桶', honey_bottle: '蜂蜜瓶', glass_bottle: '玻璃瓶',
  iron_ingot: '铁锭', iron_nugget: '铁粒', copper_ingot: '铜锭', bamboo: '竹子',
  string: '线', leather: '皮革', blue_dye: '蓝色染料', blue_wool: '蓝色羊毛',
  brick: '红砖', cobblestone: '圆石', smooth_stone_slab: '平滑石台阶', cauldron: '炼药锅',
  clay_ball: '黏土球', glass: '玻璃', dirt: '泥土', coal: '煤炭', paper: '纸',
  cooked_porkchop: '熟猪排', cooked_chicken: '熟鸡肉', cooked_beef: '牛排', cooked_mutton: '熟羊肉',
  cooked_cod: '熟鳕鱼', cod: '鳕鱼', salmon: '鲑鱼', cooked_salmon: '熟鲑鱼',
  carrot: '胡萝卜', potato: '马铃薯', baked_potato: '烤马铃薯', kelp: '海带', dried_kelp: '干海带',
  sweet_berries: '甜浆果', glow_berries: '发光浆果', apple: '苹果', melon_slice: '西瓜片',
  pumpkin: '南瓜', pumpkin_seeds: '南瓜种子', sugar_cane: '甘蔗', brown_mushroom: '棕色蘑菇',
  red_mushroom: '红色蘑菇', cocoa_beans: '可可豆', honeycomb: '蜜脾', rabbit: '兔肉',
  glass_pane: '玻璃板', stone: '石头', red_sand: '红沙', clay: '黏土', bread: '面包', iron_block: '铁块',
}
const tagIcons = { planks: 'oak_planks', logs: 'oak_log' }
const modelIcons = {
  // The custom model combines an oak-log frame with a cauldron, so use the
  // vanilla cauldron sprite as its compact guide thumbnail.
  tea_drying_pan: '/images/minecraft/item/cauldron.png',
  tea_table: '/images/teastory/tea_table.png',
  tea_stove: '/images/teastory/tea_stove.png',
  barrel: '/images/teastory/barrel.png',
}
const items = {}
const missingIcons = new Set()
const plainName = (value) => typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim() : value
function register(id) {
  if (items[id]) return items[id]
  const name = id.split(':').at(-1)
  const vanilla = id.replace(/^#/, '').startsWith('minecraft:')
  const def = definitions[id] || {}
  const english = name.replaceAll('_', ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase())
  const names = vanilla
    ? { zh: vanillaNames[name] || english, en: id.startsWith('#') ? `Any ${english}` : english }
    : { zh: plainName(translations.zh_cn[`item.${name}`]), en: plainName(translations.en[`item.${name}`]) }
  if (!names.zh || !names.en) throw new Error(`Missing translation: ${id}`)
  let icon = ''
  if (vanilla) {
    const imageName = tagIcons[name] || name
    for (const candidate of [imageName, `${imageName}_side`, `${imageName}_top`]) {
      for (const kind of ['item', 'block']) {
        const path = `/images/minecraft/${kind}/${candidate}.png`
        if (!icon && existsSync(join(root, 'docs/public', path))) icon = path
      }
    }
  } else {
    icon = modelIcons[name] || ''
    if (!icon) {
      const texture = def.texture || def.overrides?.texture || `minecraft:item/teastory/${name.replace(/^boiled_water_/, 'water_')}`
      const [namespace, relative] = texture.split(':')
      const source = join(resources, 'resourcepack/assets', namespace, 'textures', `${relative}.png`)
      const destination = join(root, 'docs/public/images/teastory', `${name}.png`)
      if (existsSync(source)) {
        if (!existsSync(destination) || !readFileSync(source).equals(readFileSync(destination))) copyFileSync(source, destination)
        icon = `/images/teastory/${name}.png`
      } else {
        // Keep names for model-only items without a compact guide thumbnail.
        missingIcons.add(id)
      }
    }
  }
  items[id] = { id, ...names, icon, food: def.data?.food, returns: def.settings?.['consume-replacement'] }
  if (items[id].returns) register(items[id].returns)
  return items[id]
}
function ingredient(value, role) {
  const raw = typeof value === 'string' || Array.isArray(value) ? { items: value } : value
  const alternatives = raw.any || (Array.isArray(raw.items) ? raw.items : [raw.id || raw.items || raw.item])
  if (alternatives.some((entry) => !entry)) throw new Error(`Unsupported ingredient: ${JSON.stringify(value)}`)
  const ids = alternatives.map((entry) => typeof entry === 'string' ? entry : entry.id)
  ids.forEach(register)
  return { ids, count: raw.count || raw.amount || 1, role, returns: raw['consume-replacement'], damage: raw.damage }
}
const recipes = []
for (const file of readdirSync(join(config, 'recipes/teastory')).filter((name) => name.endsWith('.yml') && !name.includes('furniture')).sort()) {
  const source = readYaml(join(config, 'recipes/teastory', file)).recipes
  for (const [id, recipe] of Object.entries(source || {})) {
    const result = recipe.result
    if (!result?.id) continue
    register(result.id)
    const record = { id, method: recipe.type, result: result.id, count: result.count || 1, time: recipe.time }
    if (recipe.type === 'shaped') {
      const counts = new Map()
      record.pattern = Array.from({ length: 9 }, (_, i) => {
        const symbol = recipe.pattern[Math.floor(i / 3)]?.[i % 3] || ' '
        if (symbol === ' ') return null
        const part = ingredient(recipe.ingredients[symbol])
        const key = part.ids.join('|')
        const previous = counts.get(key)
        counts.set(key, previous ? { ...previous, count: previous.count + part.count } : part)
        return part.ids[0]
      })
      record.inputs = [...counts.values()]
    } else {
      const inputs = recipe.ingredients || [recipe.ingredient]
      if (!Array.isArray(inputs) || inputs.some((input) => !input)) throw new Error(`Unsupported recipe: ${id}`)
      const counts = new Map()
      for (const value of inputs) {
        const part = ingredient(value)
        const key = part.ids.join('|')
        const previous = counts.get(key)
        counts.set(key, previous ? { ...previous, count: previous.count + part.count } : part)
      }
      record.inputs = [...counts.values()]
    }
    recipes.push(record)
  }
}
function findTable(value) {
  if (!value || typeof value !== 'object') return null
  if (value['tea-table']?.recipes) return value['tea-table']
  for (const child of Object.values(value)) {
    const match = findTable(child)
    if (match) return match
  }
  return null
}
const teaTable = findTable(readYaml(resolve(materiaArg)))
if (!teaTable) throw new Error('Tea Table configuration not found')
for (const [id, recipe] of Object.entries(teaTable.recipes)) {
  register(recipe.output.id)
  recipes.push({
    id, method: 'tea_table', result: recipe.output.id, count: recipe.output.amount || 1,
    time: recipe['process-ticks'] || teaTable.processing['process-ticks'],
    inputs: Object.entries(recipe.inputs).map(([role, value]) => ingredient(value, role)),
  })
}
const foodIds = categories['cgap:teastory_foods'].list
const tools = ['sickle', 'tea_shears', 'herb_shears', 'root_spade', 'fruit_picker', 'harvest_basket', 'seed_pouch']
const guideItems = ['fresh_tea_leaf_bud', 'withered_tea_leaf_bud', 'tea_leaf', 'wet_tea_leaf',
  'green_tea_leaf', 'broken_tea_leaf', 'semi_fermented_tea_leaf', 'fully_fermented_tea_leaf', 'deep_fermented_tea_leaf',
  'matcha_tea_leaf', 'jasmine_tea_leaf', 'tea_seeds', 'item_xian_rice_seedling', 'xian_rice_seeds', ...tools]
for (const id of [...foodIds, ...guideItems.map((id) => `cgap:${id}`)]) register(id)
for (const filename of ['tea_table', 'tea_drying_pan', 'tea_stove', 'fermentation_barrel']) {
  const folder = join(root, 'docs/public/images/teastory/gui')
  mkdirSync(folder, { recursive: true })
  copyFileSync(join(resources, 'resourcepack/assets/minecraft/textures/font/gui/teastory', `${filename}.png`), join(folder, `${filename}.png`))
}
const target = join(root, 'docs/.vitepress/theme/data/teastory-guide.json')
writeFileSync(target, `${JSON.stringify({ items, recipes, foodIds, slots: teaTable.inventory }, null, 2)}\n`)
console.log(`TeaStory snapshot: ${Object.keys(items).length} items, ${recipes.length} recipes, ${foodIds.length} food/drink entries.`)
console.log(`Model-only items without a flat icon: ${[...missingIcons].join(', ')}`)
