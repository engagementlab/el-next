import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import Link from 'next/link';
import _ from 'lodash';

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
    <Layout error={error}>
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

            {relatedItems && (
              <div>
                <h3 className="text-2xl text-bluegreen font-semibold">
                  Explore Related Media
                </h3>
                <div>
                  <div className="flex flex-col lg:flex-row justify-between items-center">
                    <p>
                      Browse similar Studio courses from the same course series,
                      professor, or media.
                    </p>
                    <Link href="/media-archive" passHref>
                      <a>See All</a>
                    </Link>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    {/* {relatedItems.map((relatedItem, i) => (
                            <Link key={i} href={`/media/${relatedItem.key}`} passHref>
                            <a className="w-full lg:w-1/3">
                            <div>
                            <Image id={`thumb-${i}`} alt={`Thumbnail for media with name "${relatedItem.name}"`} imgId={relatedItem.thumbnail.publicId} width={302}  />
                            <h4 className='text-xl font-semibold mt-3'>{relatedItem.name}</h4>
                            
                            <p>{_.map(relatedItem.filters, 'name').join(', ')}</p>
                            </div>
                            </a>
                            </Link>
                            ))} */}
                  </div>
                </div>
              </div>
            )}
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

  return { props: { item, relatedItems } };
}
