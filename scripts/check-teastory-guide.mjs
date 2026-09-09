import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const snapshot = JSON.parse(readFileSync(join(root, 'docs/.vitepress/theme/data/teastory-guide.json'), 'utf8'))
const failures = []
const itemIds = new Set(Object.keys(snapshot.items))

for (const id of snapshot.foodIds) {
  if (!itemIds.has(id)) failures.push(`food item missing: ${id}`)
  if (!snapshot.recipes.some((recipe) => recipe.result === id)) failures.push(`food recipe missing: ${id}`)
}
for (const item of Object.values(snapshot.items)) {
  if (item.icon && !existsSync(join(root, 'docs/public', item.icon))) failures.push(`icon missing: ${item.id} -> ${item.icon}`)
}
for (const recipe of snapshot.recipes) {
  if (!itemIds.has(recipe.result)) failures.push(`recipe result missing: ${recipe.id}`)
  for (const part of recipe.inputs) for (const id of part.ids) if (!itemIds.has(id)) failures.push(`recipe ingredient missing: ${recipe.id} -> ${id}`)
}
const teaTypes = ['green_tea', 'black_tea', 'jasmine_tea', 'oolong_tea', 'puer_tea', 'white_tea', 'yellow_tea', 'milk_tea', 'lemon_tea', 'matcha_drink']
const vessels = ['glass', 'stone', 'wood', 'porcelain', 'zisha', 'porcelain_kettle', 'zisha_kettle']
for (const type of teaTypes) for (const vessel of vessels) {
  const result = `cgap:${type}_${vessel}`
  if (!snapshot.recipes.some((recipe) => recipe.method === 'tea_table' && recipe.result === result && recipe.inputs.some((part) => part.role === 'water'))) failures.push(`tea table recipe missing: ${result}`)
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`TeaStory guide check passed: ${snapshot.foodIds.length} food/drink entries, ${snapshot.recipes.length} recipes, ${Object.keys(snapshot.items).length} items.`)
