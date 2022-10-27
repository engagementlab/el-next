import {
    GetStaticPathsResult,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next';
import Link from 'next/link';

import query from '../../../apollo-client';

import Image from '@el-next/components/image';
import Layout from '../../../components/Layout';

type Person = {
    name: string;
    title: string;
    remembrance: string;
    blurb: string;
    image: any;
    content: any;
    studios: {
      name: string;
      key: string;
      thumbnail: {
        publicId: string;
      }
    }[];
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
              <div className="flex flex-col lg:flex-row">
                  <div className='w-11/12 lg:w-1/3 flex-shrink-0'>
                    <Image id='thumb' alt={`Thumbnail for person with name "${person.name}"`} imgId={person.image.publicId} width={335} transforms='f_auto,dpr_auto,c_thumb,g_face,ar_4:3' />
                  </div>

                  <div className='lg:ml-9'>
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
                  
              </div>
     
              <hr />
              <h3 className='text-xl font-semibold my-4'>Associated Studios</h3>

              {person.studios &&
              <div className='flex flex-col lg:flex-row'>
                {person.studios.map((studio, i) => (
                    <Link key={`studio-link-${studio.key}`} href={`/studios/${studio.key}`} passHref>
                    <a className="w-full lg:w-1/3">
                      <div>
                        <Image id={`thumb-${i}`} alt={`Thumbnail for studio with name "${studio.name}"`} imgId={studio.thumbnail.publicId} width={302}  />
                        <h4 className='mt-3'>{studio.name}</h4>
                      </div>
                    </a>
                    </Link>
                ))}
              </div>
              }
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
              studios {
                name
                key
                thumbnail
                {
                  publicId
                }
              }
            }`);
    const person = itemResult[0] as Person;
    return { props: { person } };
    
}