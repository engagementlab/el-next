import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Image, Query } from '@el-next/components';

import ImagePlaceholder from '../../components/ImagePlaceholder';
import Layout from '../../components/Layout';
import { Blocks, Doc } from '../../components/Renderers';

type NewsItem = {
  title: string;
  publishDate: string;
  source: string;
  body: any;
  thumbnail: any;
  thumbAltText: string;
};

export default function NewsItem({
  item,
  relatedItems,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Back to News & Events', href: '/whats-new' }]}
    >
      {item && (
        <div className="mt-14">
          {item.thumbnail ? (
            <Image
              id="header-img"
              alt={item.thumbAltText}
              imgId={item.thumbnail.publicId}
              width={1900}
              className="w-full"
            />
          ) : (
            <ImagePlaceholder imageLabel="Header" width={1280} height={1280} />
          )}
          <div className="px-4 xl:px-8">
            <h1 className="text-coated text-2xl font-extrabold mt-5">
              {item.title}
            </h1>
            {item.source && (
              <h2 className="text-coated text-1xl mt-5">
                <span className="italic">Source:</span> {item.source}
              </h2>
            )}
            <div className="text-coated font-medium">
              {new Date(item.publishDate).toLocaleDateString('en-US', {
                weekday: 'long',
              })}
              ,{' '}
              {new Date(item.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <DocumentRenderer
              document={item.body.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'newsItems',
    `newsItems {
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
    .map(({ key }) => `/news/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'newsItems',
    `newsItems(where: { key: { equals: "${params!.key}" } }) {
       title 
       publishDate
       source 
       thumbnail { 
           publicId
       }
       thumbAltText 
       body { 
           document(hydrateRelationships: true) 
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

  const item = itemResult[0] as NewsItem;
  const relatedItems = null;

  return { props: { item, relatedItems }, revalidate: 5 };
}
