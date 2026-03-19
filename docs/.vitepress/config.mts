import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 显示右下角“最后更新于”：基于每个页面对应文件的 Git 最后提交时间戳
  lastUpdated: true,
  cleanUrls: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '群隙 ClusterGap',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
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
