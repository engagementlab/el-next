import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, HeadingStyle, Query, Image, Video } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../../components/Layout';
import {
  News,
  Event,
  ResearchProject,
  Studio,
  StudioProject,
  Theme,
  Theming,
  Item,
} from '@/types';
import { Blocks, Doc } from '@/components/Renderers';
import { ReactNode } from 'react';
import { Gutter } from '@/components/Gutter';

type AboutPage = {
  intro: {
    document: any;
  };
  slides: any[];
  body: { document: any };
  news: News[];
  events: Event[];
  projects: StudioProject[];
  studios: Studio[];
  research: ResearchProject[];
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
              Why Narrative Change?
            </h2>

            <Gutter noMarginY={false}>
              <div id="context">
                <DocumentRenderer
                  document={page?.body.document}
                  componentBlocks={Blocks(Theming[initiative])}
                  renderers={Doc({
                    heading: (
                      level: number,
                      children: ReactNode,
                      textAlign: any
                    ) => {
                      return HeadingStyle({
                        level,
                        children,
                        textAlign,
                        customRenderers: {
                          2: `font-bold text-4xl`,
                        },
                      });
                    },
                  })}
                />
              </div>
            </Gutter>
          </div>
        </div>
      )}{' '}
    </Layout>
  );
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [
      '/initiatives/tngv/why-narrative-change',
      '/initiatives/tnej/why-narrative-change',
    ],
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
        body {
          document
        }
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
