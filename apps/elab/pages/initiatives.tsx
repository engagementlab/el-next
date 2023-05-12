import { ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { HeadingStyle, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../components/Layout';

type AboutPage = {
  content: any;
  values: any;
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

export default function AboutInitiative({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error}>
      <div className=" container mt-14 mb-24 xl:mt-16 px-4 xl:px-8 w-full lg:w-10/12 xl:w-9/12">
        <h1 className="">Donec sodales</h1>
        <h3 className="">
          Cras ultricies mi eu turpis hendrerit fringilla. Nam quam nunc,
          blandit vel, luctus pulvinar, hendrerit id, lorem. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          hymenaeos. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
          semper libero, sit amet adipiscing sem neque sed ipsum. Integer
          tincidunt. Fusce egestas elit eget lorem.
        </h3>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  //   const result = await Query(
  //     'abouts',
  //     `abouts(where: { name: { equals: "About Page" } }) {
  //       content {
  //         document(hydrateRelationships: true)
  //       }
  //       values {
  //         document
  //       }
  //     }`
  //   );
  //   if (result.error) {
  //     return {
  //       props: {
  //         error: result.error,
  //         page: null,
  //       },
  //     };
  //   }
  //   const page = result[0] as AboutPage;
  //   return {
  //     props: {
  //       page,
  //     },
  //   };
  return { props: {} };
}
