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
    'plugin/ItemProp',
    'plugin/Prayer',
    'plugin/EconomicCensus',
    'plugin/EconomicCensusHttp',
    'plugin/Relations',
    'plugin/Transportation',
    'plugin/Order',
    'plugin/EchoMarket',
  ],
   
};

module.exports = sidebars;
