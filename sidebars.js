/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// @ts-ignore
const sidebars = {
  docs: [
    'intro',
    'rules',
    'menu'
  ],

  // 插件使用文档
  plugin_docs: [
    'plugins/ItemProp',
    'plugins/Prayer',
    'plugins/EconomicCensus',
    'plugins/EconomicCensusHttp',
  ],

  // 个人page
  personal_docs: [
    'personal/yolov5',
  ],
   
};

module.exports = sidebars;
