import {
    GetStaticPathsResult,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next';
import {
    useRouter
} from 'next/router';
import {
    DocumentRenderer,
} from '@keystone-6/document-renderer';

import _ from 'lodash';
import create from 'zustand';
import {
    CopyToClipboard
} from 'react-copy-to-clipboard';

import query from '../../../apollo-client';

import { BlockRenderers, Image, Video } from '@el-next/components';
import { DocRenderers } from '@el-next/components/docRenderers';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';


type Person = {
    name: string;
    title: string;
    remembrance: string;
    blurb: string;
    image: any;
    content: any;
};

export default function Person({
    person
}: InferGetStaticPropsType < typeof getStaticProps > ): "Not found!" | JSX.Element {
    // const origin =
    //     typeof window !== 'undefined' && window.location.origin
    //         ? window.location.origin
    //         : '';
    // const thisUrl = `${origin}${useRouter().asPath}`;
    // const toggleCopied = useStore(state => state.toggleCopied);
    // const wasCopied = useStore(state => state.urlCopied);

    // const filterClass = 'no-underline border-b-2 border-b-[rgba(255,255,255,0)] hover:border-b-[rgba(255,255,255,1)] transition-all';
    
    return (
      !person ? 'Not found!' :
        <Layout>
            <div className='content-container container w-full mt-14 mb-24 xl:mt-16 px-4 xl:px-8'>
              <h2 className='text-xl font-semibold text-bluegreen'>{person.name}</h2>
              <p className="mt-2 mb-8">{person.title}</p>
              <div className="flex">
                  <div className='w-full lg:w-1/3 flex-shrink-0'>
                    <Image id='thumb' alt={`Thumbnail for person with name "${person.name}"`} imgId={person.image.publicId} width={400} transforms='f_auto,dpr_auto,c_thumb,g_face,ar_4:3' />
                  </div>

                  <div>
                      {person.blurb && (
                        <p>
                          <span className="text-coated font-semibold">
                          What brings you here?
                          </span>
                          <br />
                          {person.blurb}
                        </p>
                      )}
                      {person.remembrance && (
                        <p className="text-purple font-semibold">
                          Engaged in remembrance of {person.remembrance}.
                        </p>
                      )}
                    </div>
                  {/* <DocumentRenderer document={item.content.document} componentBlocks={BlockRenderers()} renderers={DocRenderers()} /> */}
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
            </div>
        </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const items = await query(
        'people',
        `people(where: { enabled: { equals: true }}) {
          key
        }`
    ) as { key: string }[];

    const paths = items
      .filter(({ key }) => !!key)
      .map(({ key }) => `/about/community/${key}`);
  
    return {
      paths,
      fallback: false,
    };
}
  
export async function getStaticProps({ params }: GetStaticPropsContext) {
        
    const itemResult = await query(
            'people',
            `people (where: { key: { equals: "${params!.key}" } }) {
              name
              key
              title
              tag
              blurb
              remembrance
              image {
                publicId 
              } 
              content {
                document
              }
            }`);
    const person = itemResult[0] as Person;
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
    return { props: { person } };
    
}