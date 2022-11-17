import Image from '@el-next/components/image';
import { ParallaxBanner } from 'react-scroll-parallax';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import _ from 'lodash';

import query from "../../../apollo-client";

import { BlockRenderers } from '@el-next/components/blockRenderers';
import { DocRenderers } from '@el-next/components/docRenderers';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

type Home = {
  name: string;
  content: any;
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
export default function Home({ item }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="relative mt-6 lg:mt-0">
        <div className="flex flex-col justify-center items-center w-full h-full absolute top-0 left-0 bg-black/50 text-white">
          <h1 className='text-2xl lg:text-7xl'>Social Justice + Media Symposium</h1>
          <h3 className='px-5 '>The Social Justice + Media Symposium is an annual gathering of students, faculty, and stakeholders to
            explore how media practices and pedagogies can support equity, justice, and positive social change in daily
            life.</h3>
        </div>
        {/* <video playsInline autoPlay muted loop className='min-h-[20vh] bg-black/50'>
          <source
            src='https://res.cloudinary.com/engagement-lab-home/video/upload/ac_none,q_80,c_crop,f_auto,h_519,w_1905/v1668549678/sjm/intro.mp4'
            type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </section>
       <ParallaxBanner
        layers={[
          {
            speed: -20,
            children: (
              <div className="absolute inset-0">
                <Image id="bg-1" alt="A black and white photo of two women working at a table" imgId='sjm/bg-index-1'
                  width={2200} className='w-full' />
              </div>
            ),
          },
        ]}
        className="aspect-[2/1]" />
      <div className='bg-blossom text-white p-5 lg:px-48 xl:px-96'>
        <h2 className='text-3xl lg:text-6xl font-bold my-4 md:my-7'>The Symposium</h2>
        <div className='lg:ml-10'>
          <DocumentRenderer document={_.find(item, {name: 'The Symposium'}).content.document} componentBlocks={BlockRenderers()} renderers={DocRenderers()} />
        </div>
      </div>
      <ParallaxBanner
      layers={[
        {
          speed: -20,
          children: (
            <div className="absolute inset-0">
              <Image id="bg-2" alt="A black and white photo of numerous people watching a presentation" imgId='sjm/bg-index-2'
                width={2200} className='w-full' />
            </div>
          )
        },
      ]}
      className="aspect-[2/1]" />
      <div className='bg-blue text-white p-5 lg:px-48 xl:px-96'>
        <h2 className='text-3xl lg:text-6xl font-bold my-4 md:my-7'>Academic Awards</h2>
          <DocumentRenderer document={_.find(item, {name: 'Academic Awards'}).content.document} componentBlocks={BlockRenderers()} renderers={DocRenderers(rendererOverrides)} />
      </div>
    </> 
  )
}
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await query(
    'homes',
    `homes {
      name
      content {
        document
      }
  }`);
  const item = itemResult as Home;
  
  return { props: { item } };
}