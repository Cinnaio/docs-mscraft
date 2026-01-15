import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import FadeIn from '../FadeIn';

const TeamList = [
  {
    name: 'Cinnaio',
    time: '2022 - 至今',
    img: 'img/team/body_cinnaio.png',
  },
  {
    name: 'Leo_Ranbom',
    time: '2022 - 至今',
    img: 'img/team/body_Leo_Ranbom.png',
  },
  {
    name: 'bridgemoon',
    time: '2023 - 至今',
    img: 'img/team/body_bridgemoon.png',
  },
  {
    name: 'LightNingNo1',
    time: '2025 - 至今',
    img: 'img/team/body_LightNingNo1.png',
  },
];

function TeamMember({img, name, time}) {
  return (
    <div className={clsx('col col--3')}>
      <FadeIn>
        <div className="text--center">
          <img className={styles.teamImg} src={img} alt={name} />
        </div>
        <div className="text--center padding-horiz--md">
          <h3>{name}</h3>
          <p>{time}</p>
        </div>
      </FadeIn>
    </div>
  );
}

export default function HomepagePeople() {
  return (
    <section className={styles.teamSectionWithBackground}>
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">JOIN US</p>
          <h2 className="section__title">运营团队</h2>
          <p className="section__description">(按ID首字母次序进行排序)<br />(谢谢大家做出的贡献呀~)</p>
        </div>

        <div className="row">
          {TeamList.map((props, idx) => (
            <TeamMember key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
