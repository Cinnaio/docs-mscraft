import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import FadeIn from '../FadeIn';

export default function HomepageRule() {
  return (
    <section className={styles.ruleSection}>
      <div className="container">
        <FadeIn>
          <div className="section__header">
            <p className="section__subtitle">RULE</p>
            <h2 className="section__title">准入须知</h2>
          </div>
        </FadeIn>

        <FadeIn delay="0.2s">
          <div className={styles.ruleContent}>
            <div className={styles.textContent}>
              <h3 className={styles.ruleTitle}>社区守则</h3>
            <p className={styles.ruleDescription}>
              请保持友善和尊重，不发布任何攻击性、违法或有害的内容。
              这里是一个开放和包容的社区，所有人都应该感受到欢迎和舒适。
            </p>
            {/* <h2>资格准入</h2>
            <p>
              
            </p> */}

            {/* 添加按钮 */}
            <div className={styles.buttonContainer}>
              <a
                href="docs/rules"
                className={styles.ruleButton}
              >
                详细了解规则 🎈
              </a>
              <a
                href="https://qm.qq.com/q/cQypKiQ0KW"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ruleButton}
              >
                加入QQ社群
              </a>
            </div>
          </div>

          {/* 右侧图片内容 */}
          <div className={styles.imageContent}>
            <img 
              src="img/banner_2.png" 
              alt="守则须知" 
              className={styles.ruleImage} 
            />
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
