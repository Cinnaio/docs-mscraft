import type { BlockEntry } from './types'
import { paper, stringItem } from './ingredients'

export const containerBlocks: BlockEntry[] = [
  {
      id: 'empty-tea-bag',
      icon: '/images/teastory/empty_tea_bag.png',
      nameZh: '空茶包',
      nameEn: 'Empty Tea Bag',
      categoryZh: '容器',
      categoryEn: 'Container',
      descriptionZh: '用于盛装茶叶的空包，可装入 6 份对应茶叶制成茶包。',
      descriptionEn: 'Empty bag for holding tea leaves. Holds 6 portions of tea leaves.',
      obtainZh: '工作台合成（1 线 + 5 纸 → 3 空茶包）',
      obtainEn: 'Crafted (1 String + 5 Paper → 3 Empty Tea Bags)',
      recipes: [
        {
          pattern: [
            null, stringItem, null,
            paper, paper, paper,
            paper, paper, null,
          ],
          result: {
            nameZh: '空茶包',
            nameEn: 'Empty Tea Bag',
            entryId: 'empty-tea-bag',
            icon: '/images/teastory/empty_tea_bag.png',
            count: 3,
          },
          noteZh: '3×3 查询页展示摆位。',
          noteEn: '3×3 display layout for the query page.',
        },
      ],
      properties: {
        容量: '6 茶叶 → 1 茶包',
      },
    }
]
