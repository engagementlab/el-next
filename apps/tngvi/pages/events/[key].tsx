import { ReactNode } from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import Link from 'next/link';
import _ from 'lodash';

import query from "../../apollo-client";

import { Image } from '@el-next/components/image';
import { BlockRenderers } from '@el-next/components/blockRenderers';
import Layout from '../../components/Layout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { HeadingStyle } from '@el-next/components/headingStyle';
import { DocRenderers } from '@el-next/components/docRenderers';

type Event = {
  name: string;
  eventDate: string;
  content: any;
  thumbnail: any;
  thumbAltText: string;
};

const rendererOverrides = {
    heading: (level: number, children: ReactNode, textAlign: any) => {
        const customRenderers = {
            4: 'font-semibold text-[18px] text-coated'
        };
        return HeadingStyle(level, children, textAlign, customRenderers);
    }
};

export default function Event({ item }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
    !item ? 'Not found!' :
    <Layout>
        <div className='mt-14'>
            {
                item.thumbnail ?
                <Image id='header-img' alt={item.thumbAltText} imgId={item.thumbnail.publicId} /> :
                <ImagePlaceholder imageLabel='Header' width={1280} height={350} />
            }
            <div className='px-4 xl:px-8'>
                <h1 className="text-coated text-2xl font-extrabold mt-5">{item.name}</h1>
                <div className="text-coated font-medium">
                    {new Date(item.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                    })}, {new Date(item.eventDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}, {new Date(item.eventDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
  
                <DocumentRenderer document={item.content.document} componentBlocks={BlockRenderers()} renderers={DocRenderers(rendererOverrides)} />

               {/*  {relatedItems &&
                    <div>
                    <h3 className='text-2xl text-bluegreen font-semibold'>Explore Related Media</h3>
                    <div>
                        <div className='flex flex-col lg:flex-row justify-between items-center'>
                            <p>Browse similar Studio courses from the same course series, professor, or media.</p>
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
                            <Image id={`thumb-${i}`} alt={`Thumbnail for media with name "${relatedItem.name}"`} imgId={relatedItem.thumbnail.publicId} width={302}  />
                            <h4 className='text-xl font-semibold mt-3'>{relatedItem.name}</h4>
                            
                            <p>{_.map(relatedItem.filters, 'name').join(', ')}</p>
                            </div>
                            </a>
                            </Link>
                            ))}
                        </div>
                    </div>
                    </div>
                } */}
            </div>
        </div>
    </Layout>
    );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const items = await query(
        'events',
        `events {
            key
        }`
    ) as { key: string }[];

    const paths = items
    .filter(({ key }) => !!key)
    .map(({ key }) => `/events/${key}`);

    return {
    paths,
    fallback: false,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await query(
    'events',
    `events(where: { key: { equals: "${params!.key}" } }) {
       name
       eventDate
       content { 
           document 
       }
       thumbAltText
       thumbnail { 
           publicId 
       }
      }`);
  const item = itemResult[0] as Event;
  
  return { props: { item, } };
}