import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import _ from 'lodash';

import query from "../../apollo-client";

import { BlockRenderers } from '@el-next/components/blockRenderers';
import Layout from '../../components/Layout';
import { DocRenderers } from '@el-next/components/docRenderers';
import Link from 'next/link';

type Studio = {
  id: string;
  name: string;
  key: string;
  filters: any[];
  content: any;
  associatedMedia:[{ videos: any[]}];
  associatedPeople: [{
    name: string;
    key: string
    title: string;
  }]
};

export default function Studio({ item }: InferGetStaticPropsType<typeof getStaticProps>) {

const associatedPeople = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* <p>ppl</p>/ */}
      <p><Link href={`/about/community/${item.associatedPeople[0].key}`} passHref>{item.associatedPeople[0].name}</Link>, {item.associatedPeople[0].title}</p>
    </div>
  );
};
  return (
  !item ? 'Not found!' :
  <Layout>
    <div>
        <div className='content-container container w-full mt-14 mb-24 xl:mt-16 px-4 xl:px-8'>
            <h1 className="text-2xl font-bold text-bluegreen mb-2">{item.name}</h1>
            {/* <p className="text-bluegreen mb-10">{_.map(item.filters, 'name').join(', ')}</p> */}

            <DocumentRenderer document={item.content.document} componentBlocks={BlockRenderers(undefined, associatedPeople)} renderers={DocRenderers()} />
{/* 
            {item.associatedMedia &&
              <div className='mt-14'>
                {item.associatedMedia.map((media) => {
                  if(!media.videos) return;
                  return media.videos.map((video, i) => (
                      <div key={`video-${i}`}>
                        <Video videoLabel={video.label} videoUrl={video.value} thumbUrl={video.thumb} />
                        <h3 className="text-bluegreen text-xl font-semibold hover:text-green-blue group-hover:text-green-blue">{video.label}</h3>
                        <p className="mt-2 mb-20">{video.caption}</p>
                      </div>
                  ));
                })}
              </div>
            } */}

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
                        ))
                    </div>
                  </div>
                </div>
            }} */}
        </div>
    </div>
  </Layout>
);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await query(
      'studios',
      ` studios {
          key
        }
        `
  ) as { key: string }[];

  const paths = items
    .filter(({ key }) => !!key)
    .map(({ key }) => `/studios/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await query(
    'studios',
    `studios(where: { key: { equals: "${params!.key}" } }) {
       name 
       filters { 
        name
       } 
       associatedPeople {
        name
        key
        title
       } 
       content {
        document(hydrateRelationships: true)
       } 
      }`);
  const item = itemResult[0] as Studio;
  console.log(item.content.document[0].children[1].children);
  // const item = (await query.Studio.findOne({
  //     where: { key: params!.key as string },
  //     query: '',
  // })) as Studio;
  // const relatedItems = (await query.Studio.findMany({
  //     query: 'name key filters { type name } thumbnail { publicId }',
  // })) as Studio[];
  
  return { props: { item } };
}