import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Query, Video } from '@el-next/components';

import _ from 'lodash';
import create from 'zustand';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Layout from '../../components/Layout';
import { Blocks, Doc } from '../../components/Renderers';

type MediaItem = {
  title: string;
  key: string;
  content: any;
  shortDescription: string;
  filters: any[];
  videos: any[];
  thumbnail: {
    publicId: string;
  };
};
type ShareState = {
  urlCopied: boolean;
  toggleCopied: (open: boolean) => void;
};
// Create store with Zustand
const useStore = create<ShareState>((set) => ({
  urlCopied: false,
  toggleCopied: (open: boolean) =>
    set({
      urlCopied: open,
    }),
}));

export default function MediaItem({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const thisUrl = `${origin}${useRouter().asPath}`;
  const toggleCopied = useStore((state) => state.toggleCopied);
  const wasCopied = useStore((state) => state.urlCopied);

  const filterClass =
    'no-underline border-b-2 border-b-[rgba(255,255,255,0)] hover:border-b-[rgba(255,255,255,1)] transition-all';

  return (
    <Layout error={error}>
      {item && (
        <>
          <div className="mt-14 pt-14 text-white bg-coated">
            {item?.videos && (
              <Video
                videoLabel={item?.videos[0].label}
                videoUrl={item?.videos[0].value}
                thumbUrl={item?.videos[0].thumb}
              />
            )}
            <div className="flex justify-between pt-8 pb-12 px-4 xl:px-8">
              <div>
                <h1 className="text-2xl font-bold mb-2">{item?.title}</h1>
                {/* Render filters as links */}
                <p>
                  {item?.filters &&
                    item?.filters.map((filter: any, i: number) => {
                      return filter.enabled ? (
                        <span key={filter.key}>
                          <Link href={`${origin}/archive/?${filter.key}`}>
                            <a className={filterClass}>{filter.name}</a>
                          </Link>
                          {i < item?.filters.length - 1 && ','}&nbsp;
                        </span>
                      ) : (
                        ''
                      );
                    })}
                </p>
              </div>
              <div>
                <CopyToClipboard
                  text={thisUrl}
                  onCopy={() => toggleCopied(true)}
                >
                  <button
                    disabled={wasCopied}
                    className={`inline-block rounded-full px-10 py-7 uppercase
                                    border-2 border-oasis text-white text-sm lg:text-lg transition-all ${
                                      !wasCopied && 'hover:opacity-75'
                                    }`}
                  >
                    {!wasCopied ? 'Copy URL to Share' : 'URL Copied!'}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className="content-container container w-full mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
            <DocumentRenderer
              document={item?.content.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
            {/*
                    <h3 className='text-2xl text-bluegreen font-semibold'>Explore Related Media</h3>

                     {relatedItems &&
                        <div>
                        <div className='flex flex-col lg:flex-row justify-between items-center'>
                        <p>Browse other stories to keep learning</p>
                        <Link href='/media-archive' passHref>
                        <a>
                        See All
                        </a>
                        </Link>
                        </div>
                        <div className='flex flex-col lg:flex-row'>
                        {relatedItems.map((relatedItem, i) => (
                            <Link key={i} href={`/media/${relatedItem.key}`} passHref>
                            <a className="w-full lg:w-1/3">
                            <div>
                            <Image id={`thumb-${i}`} alt={`Thumbnail for media with name "${relatedItem.title}"`} imgId={relatedItem.thumbnail.publicId} width={302}  />
                            <h4 className='text-xl font-semibold mt-3'>{relatedItem.title}</h4>
                            
                            <p className='text-base'>{relatedItem.shortDescription}</p>
                            <p>{_.map(relatedItem.filters, 'name').join(', ')}</p>
                            </div>
                            </a>
                            </Link>
                            ))}
                            </div>
                            </div>
                        } */}
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'mediaItems',
    `mediaItems {
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
    .map(({ key }) => `/archive/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'mediaItems',
    `mediaItems(where: { key: { equals: "${params!.key}" } }) {
            title
            content {
              document(hydrateRelationships: true)
            }
            filters {
              name
              key
              enabled
            }
            videos
            thumbnail {
              publicId
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
  const item = itemResult[0] as MediaItem;
  // const relatedItems = (await query.MediaItem.findMany({
  //     where: {
  //         filters: {
  //             some:{
  //                 OR: [
  //                     { name: { equals: "2022" } },
  //                     { name: { equals: "Rural Voices" } }
  //                 ]
  //             }
  //         }
  //     },
  //     query: 'title key filters { key name } shortDescription thumbnail { publicId }',
  // })) as MediaItem[];
  return { props: { item } };
}
