import { defineConfig } from 'vitepress'
// 你的 TypeScript 配置未包含 Node 类型声明时，下面两个导入会被误报。
// 这里在编辑器层面抑制该类型错误，不影响运行时（VitePress 构建时会在 Node 环境执行）。
// @ts-ignore
import { execSync } from 'child_process'
// @ts-ignore
import { fileURLToPath } from 'url'
// @ts-ignore
import { createHash } from 'crypto'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'

type LastUpdatedMeta = {
  by?: string
  email?: string
  avatarUrl?: string
}

const lastUpdatedMetaCache = new Map<string, LastUpdatedMeta>()

function looksLikeGitHubUsername(name?: string): string | undefined {
  const v = (name || '').trim()
  if (!v) return
  // GitHub username: 1-39 chars, alnum or hyphen, cannot start/end with hyphen,
  // no consecutive hyphens.
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(v)) return
  if (v.includes('--')) return
  return v
}

function getAvatarUrl(by?: string, email?: string): string | undefined {
  const trimmedEmail = (email || '').trim()

  // 1) Best: GitHub noreply email includes username
  if (trimmedEmail) {
    const noreply = trimmedEmail.match(
      /^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/i
    )
    if (noreply?.[2]) return `https://github.com/${noreply[2]}.png?size=64`
  }

  // 2) Common in OSS: author name is the GitHub username
  const gh = looksLikeGitHubUsername(by)
  if (gh) return `https://github.com/${gh}.png?size=64`

  // 3) Fallback: Gravatar (identicon), based on MD5(email)
  if (trimmedEmail) {
    const md5 = createHash('md5')
      .update(trimmedEmail.toLowerCase())
      .digest('hex')
    return `https://www.gravatar.com/avatar/${md5}?s=64&d=identicon`
  }
}

type AutoSidebarItem = { text: string; link: string }

const DOCS_DIR = fileURLToPath(new URL('..', import.meta.url)) // /docs

function readFirstH1(md: string): string | undefined {
  // remove frontmatter
  const withoutFm = md.replace(/^---[\s\S]*?\n---\s*\n/, '')
  const lines = withoutFm.split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^#\s+(.+?)\s*$/)
    if (m?.[1]) return m[1].trim()
  }
}

function autoSidebarFromDir(dirUnderDocs: string, linkBase: string): AutoSidebarItem[] {
  const absDir = path.join(DOCS_DIR, dirUnderDocs)
  let entries: string[] = []
  try {
    entries = fs.readdirSync(absDir)
  } catch {
    return []
  }

  return entries
    .filter((name) => name.toLowerCase().endsWith('.md'))
    .filter((name) => name.toLowerCase() !== 'index.md')
    .sort((a, b) => a.localeCompare(b, 'en'))
    .map((name) => {
      const abs = path.join(absDir, name)
      let text = name.replace(/\.md$/i, '')
      try {
        const md = fs.readFileSync(abs, 'utf8')
        text = readFirstH1(md) || text
      } catch {
        // ignore
      }
      const slug = name.replace(/\.md$/i, '')
      const link = `${linkBase}/${slug}`.replace(/\/+/g, '/')
      return { text, link }
    })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 显示右下角“最后更新于”：基于每个页面对应文件的 Git 最后提交时间戳
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
      },
    ],
  ],
  transformPageData(pageData) {
    // VitePress 默认只提供 `lastUpdated`（时间戳），不提供“最后更新人”。
    // 这里在构建阶段用 git log 取作者名注入到 pageData，供自定义组件渲染。
    if (!pageData.lastUpdated) return

    const relativePath = (pageData.relativePath || '').replace(/^\//, '')
    if (!relativePath) return

    // 由于构建命令是从仓库根目录执行，Git 路径需要带上 `docs/` 前缀
    const repoPath = `docs/${relativePath}`.replace(/\\/g, '/')

    if (!lastUpdatedMetaCache.has(repoPath)) {
      try {
        const by = execSync(`git log -1 --pretty=%an -- "${repoPath}"`, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        })
          .toString()
          .trim()

        const email = execSync(`git log -1 --pretty=%ae -- "${repoPath}"`, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        })
          .toString()
          .trim()

        lastUpdatedMetaCache.set(repoPath, {
          by: by || undefined,
          email: email || undefined,
          avatarUrl: getAvatarUrl(by || undefined, email || undefined),
        })
      } catch {
        lastUpdatedMetaCache.set(repoPath, {})
      }
    }

    const meta = lastUpdatedMetaCache.get(repoPath) ?? {}
    ;(pageData as any).lastUpdatedBy = meta.by
    ;(pageData as any).lastUpdatedAvatar = meta.avatarUrl
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
      description: '中国传统元素与季节系统、社会模拟、玩家驱动的 Minecraft 世界。请保持友善与尊重，共同维护良好的游戏环境。',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/images/logo.png',
        nav: [
          { text: '首页', link: '/' },
          { text: '文档维基', link: '/getting-started' },
          { text: '建议收集', link: '/feedback' }
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
            text: '常用功能维基',
            items: [
              { text: '圈地教程', link: '/residence' }
            ]
          },
          {
            text: '插件维基',
            items: [
              {
                text: 'BreweryX 酿酒',
                items: autoSidebarFromDir('tutorial/BreweryX', '/tutorial/BreweryX')
              },
              { text: 'Transportation 坐骑', link: '/tutorial/transportation' }
            ]
          },
        ],

        // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        
        lastUpdated: {
          text: '最后提交于',
          formatOptions: {
            // 强制使用当前语言环境格式化日期
            forceLocale: true,
            dateStyle: 'short',
            timeStyle: 'short',
          }
        },
        // @ts-ignore
        lastUpdatedBy: {
          text: '最后提交者',
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
      description:
        'A player-driven Minecraft world with Chinese-inspired elements, seasons, and social simulation. Please be kind and respectful.',
      themeConfig: {
        logo: '/images/logo.png',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/getting-started' }
          ,{ text: 'Feedback', link: '/en/feedback' }
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
            text: 'Common Features Wiki',
            items: [
              { text: 'Land Claim Guide', link: '/en/residence' }
            ]
          },
          {
            text: 'Plugin Wiki',
            items: [
              {
                text: 'BreweryX',
                items: autoSidebarFromDir('en/tutorial/BreweryX', '/en/tutorial/BreweryX')
              },
              { text: 'Transportation', link: '/en/tutorial/transportation' }
            ]
          }
        ],

        // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        
        lastUpdated: {
          text: 'Last committed',
          formatOptions: {
            forceLocale: true,
            dateStyle: 'short',
            timeStyle: 'short',
          }
        },
        // @ts-ignore
        lastUpdatedBy: {
          text: 'Committed by',
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
