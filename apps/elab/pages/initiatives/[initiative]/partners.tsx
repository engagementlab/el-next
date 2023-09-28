import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import { Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import { Theming } from '@/types';

import { Gutter } from '@/components/Gutter';
import Logos from '@/components/Logos';

type AboutPage = {
  partners: { key: string; description: string }[];
};

export default function GunViolence({
  page,
  initiative,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true} theme={Theming[initiative].theme}>
      {page && (
        <div className="text-grey">
          <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
            <h2 className="text-4xl lg:text-5xl text-slate font-extrabold">
              Partners
            </h2>

            <Gutter noMarginY={false}>
              {page.partners.map((partner) => (
                <div
                  key={partner.key}
                  className="flex flex-col-reverse lg:flex-row gap-x-5"
                >
                  <div className="w-full lg:w-1/2">
                    <Logos partners={[partner.key]} />
                  </div>
                </div>
              ))}
            </Gutter>
          </div>
        </div>
      )}
    </Layout>
  );
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['/initiatives/tngv/partners', '/initiatives/tnej/partners'],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string };
}) {
  let objectName = 'Gun Violence';
  let initiative = 'tngv';
  if (params.initiative === 'tnej') {
    objectName = 'Environmental Justice';
    initiative = 'tnej';
  }
  const result = await Query(
    'initiative',
    `initiative(where: { name: "${objectName}" }) {      
        partners
      }`
  );
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
        initiative: 'tngv',
      },
    };
  }

  const page = result as AboutPage;

  return {
    props: {
      page,
      initiative,
    },
    revalidate: 5,
  };
}
