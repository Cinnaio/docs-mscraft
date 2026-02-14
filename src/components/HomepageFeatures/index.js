import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import FadeIn from '../FadeIn';

const FeatureList = [
  {
    title: '社会模拟',
    img: 'img/banner_3.png',
    description: (
      <>
        在这里，每个人都是独特的个体，通过交互构建起丰富多彩的社会关系。
        体验不同的社会角色，探索人与人之间的互动，感受社会发展的脉动。
      </>
    ),
  },
  {
    title: '中国传统元素',
    img: 'img/banner_8.png',
    description: (
      <>
        穿越时空，感受中华文明的博大精深。从建筑到服饰，
        从礼仪到艺术，让传统文化在虚拟世界中焕发新生。
      </>
    ),
  },
  // {
  //   title: '国风世界',
  //   img: 'img/banner.png',
  //   description: (
  //     <>
  //       沉浸在充满东方美学的世界中，感受诗意栖居的生活方式。
  //       让古典与现代交融，创造独特的游戏体验。
  //     </>
  //   ),
  // },
];

function Feature({ img, title, description, isEven }) {
  return (
    <FadeIn>
      <div className={clsx(styles.featureItem, isEven && styles.featureItemEven)}>
        <div className={styles.featureInner}>
          <div className={styles.featureImageSection}>
            <div className={styles.imageWrapper}>
              <img src={img} alt={title} className={styles.featureImage} />
            </div>
          </div>
          <div className={styles.featureContent}>
            <div className={styles.contentInner}>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDescription}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">FOCUS</p>
          <h2 className="section__title">主打特色</h2>
        </div>
        
        <div className={styles.featureList}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} isEven={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
