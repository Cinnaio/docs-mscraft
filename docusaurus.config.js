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
  url: 'https://play.mscraft.cn/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Cinnaio', // Usually your GitHub org/user name.
  projectName: 'docs-mscraft', // Usually your repo name.
  deploymentBranch: 'main',

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
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Cinnaio/docs-mscraft/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: ['plugin-image-zoom'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/banner.png',
      imageZoom: {
        selector: '.markdown img',
        options: {
          background: 'rgba(0,0,0,0.8)',
        },
      },
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
            label: '文档维基',
          },
          {
            type: 'docSidebar',
            sidebarId: 'plugin_docs',
            position: 'right',
            label: '插件维基',
          },
          {
            href: 'https://skin.cubem.cn/',
            position: 'right',
            label: '皮肤站',
          },
          {
            href: 'https://github.com/clustergap/',
            label: '项目地址',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © 2022 - ${new Date().getFullYear()} 群隙, Inc. Built with <a href="https://docusaurus.io/zh-CN/docs/" target="_blank" rel="noopener noreferrer">Docusaurus</a>.<br />`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
