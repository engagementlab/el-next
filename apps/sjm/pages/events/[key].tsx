import Image from '@el-next/components/image';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import _ from 'lodash';

import query from "../../../../apollo-client";

import { Blocks, Doc } from '../../components/Renderers';
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

type Event = {
    name: string;
    intro: any;
    agenda: any;
    awards: any;
    location: any;
}
const rendererOverrides = {
  layout: (layout: any, children: any) => {
    const flexClass = 'flex gap-y-5 flex-col xl:flex-row justify-between';
    if(layout[0] === 1 && layout[1] === 1) {
        return (
            <div
                className={flexClass}
            >
            {children.map((element: any, i: number) => (
                <div key={i} className='w-full xl:w-1/2'>{element}</div>
            ))}
            </div>
        );
    }

  }
};
export default function Event({ item }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="relative mt-6 lg:mt-0">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className='text-2xl lg:text-7xl'>{item.name}</h1>
        <div className='lg:ml-10'>
          <DocumentRenderer document={item.intro.document} componentBlocks={Blocks()} renderers={Doc()} />
        </div>
      </div>
    </section> 
    </>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const items = await query(
        'events',
        ` events {
            key
        }
        `
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
        intro {
            document
        }
        agenda {
            document
        }
        awards {
            document
        }
        location {
            document
        }    
    }`);
    const item = itemResult[0] as Event;
  
  return { props: { item } };
}