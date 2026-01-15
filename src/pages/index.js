import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageRule from '@site/src/components/HomepageRule';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepagePeople from '@site/src/components/HomepagePeople';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="hero__title">{siteConfig.title}</div>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
        {/* <p></p> */}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="中国传统元素、社会模拟、国风的Minecraft世界">
        {/* <head>
          <meta itemProp="image" content="https://mscraft.cn/img/share_logo.png" />
        </head> */}
      <HomepageHeader />
      <main>
        <HomepageRule />
        <HomepageFeatures />
        <HomepagePeople />
      </main>
    </Layout>
  );
}
