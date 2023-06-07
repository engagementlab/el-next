import { ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';

import { Button, HeadingStyle, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../components/Layout';

type AboutPage = {
  description: string;
};

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    return (
      <p
        className={`${level === 3 && 'text-2xl text-bluegreen leading-none'} ${
          level === 4 && 'text-xl text-coated'
        } font-semibold mb-8`}
        style={{ textAlign }}
      >
        {children}
      </p>
    );
  },
};
const valuesRendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      4: 'text-xl font-semibold text-coated my-8',
      5: 'text-lg font-extrabold text-purple',
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
};

export default function Initiatives({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true}>
      <div
        id="tngvi"
        className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full"
      >
        <h2>Transforming Narratives of Gun Violence</h2>
        <p>
          Transforming Narratives of Gun Violence (TNGV) is a collaborative
          initiative which seeks to understand the impact of dominant narratives
          of gun violence on individuals, families, and communities most
          impacted, and aims to co-create interventions to change these
          narratives. TNGV is facilitated by the Engagement Lab at Emerson
          College in partnership with the Louis D. Brown Peace Institute,
          Massachusetts General Hospital’s Gun Violence Prevention Center, and a
          growing cohort of grassroots organizations.
          <Button label="→ Projects" link="/archive?gunviolence" />
        </p>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Initiatives Landing Page" }) {
        description
      }`
  );
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }

  const page = result as AboutPage;
  return {
    props: {
      page,
    },
  };
}
