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
import { DefaultWhereCondition, News, Theme, Theming } from '@/types';
import Slideshow from '@/components/Slideshow';

export default function NewsItem({
  item,
  relatedItems,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let theme = 'none';
  if (item) {
    if (item.initiatives && item.initiatives.length > 0) {
      if (item.initiatives[0] === 'gunviolence') theme = 'tngv';
      else if (item.initiatives[0] === 'climate') theme = 'tnej';
    }
  }
  return item ? (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Back to News & Events', href: '/whats-new' }]}
      title={`${item.title} - News`}
      ogDescription={item.summary}
      ogImageId={
        item.ogImage && item.ogImage.publicId
          ? item.ogImage.publicId
          : item.thumbnail.publicId
      }
    >
      <div className="mt-14">
        <div className="flex flex-col xl:flex-row gap-8 px-4 xl:px-8">
          <div className="w-full xl:w-1/2 flex-shrink-0">
            {item.slides && item.slides.length > 0 ? (
              <Slideshow
                slides={item?.slides}
                theme={Theming[theme]}
                className={`${Theming[theme].bg} bg-opacity-50`}
              />
            ) : item.thumbnail ? (
              <Image
                id="header-img"
                alt={item.thumbAltText}
                imgId={item.thumbnail.publicId}
                width={1900}
                className="w-full"
              />
            ) : (
              <ImagePlaceholder
                imageLabel="Header"
                width={1280}
                height={1280}
              />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-coated text-4xl font-extrabold mt-5">
              {item.title}
            </h1>

            <div className="text-coated text-2xl my-5 font-medium">
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
              document={item.blurb.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
          </div>
        </div>

        <div className="px-4 xl:px-8">
          <DocumentRenderer
            document={item.body.document}
            componentBlocks={Blocks()}
            renderers={Doc()}
          />
        </div>
      </div>
    </Layout>
  ) : (
    <h1>Something went wrong.</h1>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'newsItems',
    `newsItems(${DefaultWhereCondition()}) {
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
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'newsItems',
    `newsItems(where: { key: { equals: "${params!.key}" } }) {
      title 
      blurb { document }
      publishDate
      thumbnail { 
          publicId
      }
      thumbAltText 
      initiatives
      body { 
          document(hydrateRelationships: true) 
      }
      slides {
        altText
        image {
          publicId
          publicUrl
        }
        caption
        captions { 
          url 
        }
        video { 
          file 
        }
        order
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

  const item = itemResult[0] as News;
  const relatedItems = null;

  return { props: { item, relatedItems }, revalidate: 1 };
}
