import { InferGetStaticPropsType } from 'next';
import query from "../../../../apollo-client";
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import { BlockRenderers } from '@el-next/components/blockRenderers';
import Layout from '../../components/Layout';

import { DocRenderers } from '@el-next/components/docRenderers';
import { HeadingStyle } from '@el-next/components';
import { ReactNode } from 'react';

type AboutPage = {
  content: any;
  values: any;
};

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    return <p className={`${level === 3 && 'text-2xl text-bluegreen leading-none'} ${level === 4 && 'text-xl text-coated'} font-semibold mb-8`} style={{ textAlign }}>{children}</p>;
  }
};
const valuesRendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {

    const customRenderers = {
      4: 'text-xl font-semibold text-coated my-8',
      5: 'text-lg font-extrabold text-purple'
    };
    return HeadingStyle(level, children, textAlign, customRenderers);
  },
};

export default function AboutInitiative({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className='about-container container mt-14 mb-24 xl:mt-16 px-4 xl:px-8 w-full lg:w-10/12 xl:w-9/12'>
        <DocumentRenderer document={page.content.document} renderers={DocRenderers(rendererOverrides)} componentBlocks={BlockRenderers()} />

        <DocumentRenderer document={page.values.document} renderers={DocRenderers(valuesRendererOverrides)} componentBlocks={BlockRenderers()} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await query(
    'abouts',
    `abouts(where: { name: { equals: "About Page" } }) {
      content { 
        document(hydrateRelationships: true) 
      }
      values { 
        document 
      }
    }`
  );

  const page = result[0] as AboutPage;
  return {
    props: {
      page,
    }
  };
}
