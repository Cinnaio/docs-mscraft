// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '群隙 ClusterGap',
  tagline: '古风 社会模拟',
  favicon: './img/logo_beta.png',

  // Set the production url of your site here
  url: 'https://mscraft.cn/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'grxis', // Usually your GitHub org/user name.
  projectName: 'grxis.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/banner.png',
      navbar: {
        title: '群隙 ClusterGap',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo_beta.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'right',
            label: '文档 WIKI',
          },
          {
            type: 'docSidebar',
            sidebarId: 'plugin_docs',
            position: 'right',
            label: '插件文档✨',
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'personal_docs',
          //   position: 'right',
          //   label: '个人笔记',
          // },
          {
            href: 'https://github.com/clustergap',
            label: '项目地址',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        // <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">陕ICP备2021000114号</a>
        copyright: `Copyright © 2022 - ${new Date().getFullYear()} 群隙, Inc. Built with <a href="https://docusaurus.io/zh-CN/docs/" target="_blank" rel="noopener noreferrer">Docusaurus</a>.<br />`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
