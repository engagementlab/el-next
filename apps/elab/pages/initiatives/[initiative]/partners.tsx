import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import { Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import { Theming } from '@/types';

import { Gutter } from '@/components/Gutter';
import Logos from '@/components/Logos';
import Partners from '@/components/Partners';

type AboutPage = {
  partners: { name: string; description: string }[];
};

export default function PartnersPage({
  page,
  initiative,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    // <></>
    <Layout error={error} fullBleed={true} theme={Theming[initiative].theme}>
      {page && (
        <div className="text-grey">
          <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
            <h2 className="text-4xl lg:text-5xl text-slate font-extrabold">
              Partners
            </h2>

            <Gutter noMarginY={false}>
              <div
                // key={partner.name}
                className="grid lg:grid-cols-3 gap-x-5 gap-y-8"
              >
                {page.partners &&
                  page.partners.map((partner) => (
                    <>
                      <Logos partners={[partner.name]} classOverride="block" />

                      <div className="col-span-2">
                        <h3
                          className={`text-xl font-extrabold uppercase ${Theming[initiative].heading}`}
                        >
                          {Partners({ partners: [partner.name] })}
                        </h3>
                        {partner.description}
                      </div>
                    </>
                  ))}
              </div>
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
    fallback: true,
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
    revalidate: 1,
  };
}
