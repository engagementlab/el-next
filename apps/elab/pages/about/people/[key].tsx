import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { motion } from 'framer-motion';
import { Image, Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import { Blocks, Doc } from '../../../components/Renderers';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Person } from '@/types';

export default function AboutPage({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error}>
      {item && (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-grey px-5 w-full my-6 xl:my-12 mt-14 xl:mt-16 mb-24 min-h-[500px]"
          >
            <div className="flex flex-col lg:flex-row gap-x-5">
              <div className="w-full lg:w-1/3 max-md:flex flex-row items-center justify-evenly">
                <span className="max-w-[200px]">
                  {item.image && item.image.publicId ? (
                    <Image
                      id="thumb"
                      alt={`Photo of ${item.name}`}
                      imgId={item.image.publicId}
                      width={300}
                      maxWidthDisable={true}
                      transforms="f_auto,dpr_auto,c_fill,g_face,r_max,h_300,w_300"
                      className={`rounded-full border-4 mt-2 transition-all border-yellowlt`}
                    />
                  ) : (
                    <ImagePlaceholder
                      imageLabel="Person"
                      width={300}
                      height={300}
                    />
                  )}
                </span>
                <span className="lg:hidden">
                  <h1 className="font-extrabold text-3xl xl:text-5xl text-slate">
                    {item.name}
                  </h1>
                  <h3 className={`text-xl font-bold my-1 text-green-blue`}>
                    {item.title.replace(
                      ', Engagement Lab at Emerson College',
                      ''
                    )}
                  </h3>
                </span>
              </div>
              <div className="mt-5 lg:mt-0 lg:w-3/5">
                <span className="hidden lg:block">
                  <h1 className="font-extrabold text-4xl xl:text-5xl text-slate">
                    {item.name}
                  </h1>
                  <h3
                    className={`text-3xl font-bold mt-2 mb-6 text-green-blue`}
                  >
                    {item.title.replace(
                      ', Engagement Lab at Emerson College',
                      ''
                    )}
                  </h3>
                </span>
                <DocumentRenderer
                  document={item.content?.document}
                  componentBlocks={Blocks()}
                  renderers={Doc()}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'people',
    `people {
        key
    }`
  );
  if (items.error) {
    return {
      paths: [],
      fallback: true,
    };
  }
  const paths = (items as { key: string }[])
    .filter(({ key }) => !!key)
    .map(({ key }) => `/about/people/${key}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'people',
    `people(where: { key: { equals: "${params!.key}" } }) {
            name
            title
            image {
                publicId
            }
            content {
                document
            }
        }`
  );
  if (itemResult.error) {
    return {
      props: {
        error: itemResult.error,
        item: null,
      },
    };
  }
  const item = itemResult[0] as Person;

  return { props: { item }, revalidate: 1 };
}
