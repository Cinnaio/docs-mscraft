import type { BlockEntry } from './types'
import { dirt, waterBucket } from './ingredients'

export const functionalBlocks: BlockEntry[] = [
  {
    id: 'paddy-field',
    icon: '/images/teastory/paddy_field.png',
    nameZh: '水田',
    nameEn: 'Paddy Field',
    categoryZh: '功能性方块',
    categoryEn: 'Functional Block',
    descriptionZh: '用于移栽水稻秧苗的浅水耕田方块，具有水面外观并限制桶类右键交互。',
    descriptionEn: 'A shallow flooded field for transplanting rice seedlings, with water-surface visuals and restricted bucket interactions.',
    obtainZh: '工作台合成（6 泥土 + 1 水桶 → 6 水田）',
    obtainEn: 'Crafted (6 Dirt + 1 Water Bucket → 6 Paddy Fields)',
    aliasesZh: ['稻田', '水稻田', '水稻种植方块'],
    aliasesEn: ['Rice paddy', 'Flooded field', 'Rice field'],
    recipes: [
      {
        pattern: [
          dirt, dirt, dirt,
          dirt, waterBucket, dirt,
          dirt, null, null,
        ],
        result: {
          nameZh: '水田',
          nameEn: 'Paddy Field',
          entryId: 'paddy-field',
          icon: '/images/teastory/paddy_field.png',
          count: 6,
        },
        noteZh: '3×3 查询页展示摆位；桶返还以服务器实际配方行为为准。',
        noteEn: '3×3 display layout. Bucket return follows the server recipe behavior.',
      },
    ],
    properties: {
      '硬度 / Hardness': '0.5',
      '爆炸抗性 / Resistance': '0.5',
      '方块状态 / Block State': 'auto-state: solid；model: minecraft:block/teastory/water',
      '声音 / Sounds': '湿草破坏、游泳脚步、桶放置、水命中、溅水掉落',
      '交互 / Interaction': '主手右键空桶或水桶会取消事件并刷新交互 tick',
      '承载作物 / Crop': '水稻秧苗（xian_rice_plant_crop）',
    },
    relatedIds: ['item-xian-rice-seedling', 'xian-rice-seeds'],
  },
]
