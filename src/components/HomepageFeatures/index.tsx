import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Great UX',
    Svg: require('@site/static/img/graphic1.svg').default,
    description: (
      <>
      Highly intuitive, so you can find relevant information quickly and fix issues fast. Easy to learn even for newcomers, so no need to spend hours struggling with documentation or watching tutorial videos.
      </>
    ),
  },
  {
    title: 'Love for speed',
    Svg: require('@site/static/img/graphic2.svg').default,
    description: (
      <>
     Designed from the ground up for speed so that there's minimal latency between you and actionable information. Uses intelligent algorithms to crunch data and derive actionable metrics quickly.      </>
    ),
  },
  {
    title: 'High efficiency',
    Svg: require('@site/static/img/graphic3.svg').default,
    description: (
      <>
       Cube uses smart sampling to identify and retain important events while discarding a large number of normal events. Cube can process gigabytes of data per minute on a single node! See benchmarks for more details.
      </>
    ),
  },
  {
    title: 'OTel Native',
    Svg: require('@site/static/img/opentelemetry-stacked-color.svg').default,
    description: (
      <>
        Compliant with OpenTelemetry so that you can take full advantage of the rich ecosystem of components.
      </>
    ),
  },
  
  
 
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
