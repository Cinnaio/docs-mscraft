import { defineConfig } from 'vitepress'
// 你的 TypeScript 配置未包含 Node 类型声明时，下面两个导入会被误报。
// 这里在编辑器层面抑制该类型错误，不影响运行时（VitePress 构建时会在 Node 环境执行）。
// @ts-ignore
import { execSync } from 'child_process'
// @ts-ignore
import { fileURLToPath } from 'url'

const lastUpdatedByCache = new Map<string, string | undefined>()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 显示右下角“最后更新于”：基于每个页面对应文件的 Git 最后提交时间戳
  lastUpdated: true,
  cleanUrls: true,
  transformPageData(pageData) {
    // VitePress 默认只提供 `lastUpdated`（时间戳），不提供“最后更新人”。
    // 这里在构建阶段用 git log 取作者名注入到 pageData，供自定义组件渲染。
    if (!pageData.lastUpdated) return

    const relativePath = (pageData.relativePath || '').replace(/^\//, '')
    if (!relativePath) return

    // 由于构建命令是从仓库根目录执行，Git 路径需要带上 `docs/` 前缀
    const repoPath = `docs/${relativePath}`.replace(/\\/g, '/')

    if (!lastUpdatedByCache.has(repoPath)) {
      try {
        const author = execSync(`git log -1 --pretty=%an -- "${repoPath}"`, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        })
          .toString()
          .trim()

        lastUpdatedByCache.set(repoPath, author || undefined)
      } catch {
        lastUpdatedByCache.set(repoPath, undefined)
      }
    }

    const updatedBy = lastUpdatedByCache.get(repoPath)
    ;(pageData as any).lastUpdatedBy = updatedBy
  },
  vite: {
    resolve: {
      alias: [
        {
          // 覆盖默认主题组件：让“最后更新于”同时展示“最后更新人”
          find: /^.*\/VPDocFooterLastUpdated\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPDocFooterLastUpdated.vue', import.meta.url)
          ),
        },
      ],
    },
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '群隙 ClusterGap',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/images/logo.png',
        nav: [
          { text: '首页', link: '/' },
          { text: '文档维基', link: '/getting-started' },
        ],

        sidebar: [
          {
            text: '文档维基',
            items: [
              { text: '新玩家必看指南', link: '/getting-started' },
              { text: '服务器FAQ与规则', link: '/server-faq' }
            ]
          },
          {
            text: '插件维基',
            items: [
              {
                text: 'BreweryX 酿酒',
                items: [
                  { text: '酿酒手册', link: '/tutorial/BreweryX/brewing-guide' },
                  { text: '现有酒类配方', link: '/tutorial/BreweryX/recipes' }
                ]
              }
            ]
          },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        
        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            // 强制使用当前语言环境格式化日期
            forceLocale: true,
            dateStyle: 'short',
            timeStyle: 'short',
          }
        },
        // @ts-ignore
        lastUpdatedBy: {
          text: '最后更新人',
        },
        
        notFound: {
          title: '找不到页面',
          quote: '这里什么都没有，除了虚空。',
          linkText: '返回首页'
        },

        editLink: {
          // VitePress "编辑此页" 链接：跳转到你的仓库 v2 分支
          pattern: 'https://github.com/Cinnaio/docs-mscraft/edit/v2/docs/:path',
          text: '在 GitHub 上编辑此页'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'ClusterGap',
      themeConfig: {
        logo: '/images/logo.png',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/getting-started' }
        ],

        sidebar: [
          {
            text: 'Documentation',
            items: [
              { text: 'New Player Guide', link: '/en/getting-started' },
              { text: 'Server Rules & FAQ', link: '/en/server-faq' }
            ]
          },
          {
            text: 'Plugin Wiki',
            items: [
              {
                text: 'BreweryX',
                items: [
                  { text: 'Brewing Guide', link: '/en/tutorial/BreweryX/brewing-guide' },
                  { text: 'Recipe Guide', link: '/en/tutorial/BreweryX/recipes' }
                ]
              }
            ]
          }
        ],
        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            forceLocale: true,
            dateStyle: 'short',
            timeStyle: 'short',
          }
        },
        // @ts-ignore
        lastUpdatedBy: {
          text: 'Updated by',
        },
        
        notFound: {
          title: 'Page Not Found',
          quote: "There's nothing here but void.",
          linkText: 'Take me home'
        },

        editLink: {
          // VitePress "Edit this page" 链接：跳转到你的仓库 v2 分支
          pattern: 'https://github.com/Cinnaio/docs-mscraft/edit/v2/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  }
})
