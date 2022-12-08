import { ReactNode, useEffect, useState } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ParallaxBanner } from 'react-scroll-parallax';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import _ from 'lodash';

import Image from '@el-next/components/image';
import { HeadingStyle } from '@el-next/components/headingStyle';

import query from "../../../apollo-client";

import { Blocks, Doc } from '../components/Renderers';

type Home = {
  name: string;
  content: any;
}
const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      3: 'text-4xl font-medium tracking-wider my-4'
    };
    return HeadingStyle(level, children, textAlign, customRenderers);
  },
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

    const [bgVideo, setBgVideo] = useState('');

    useEffect(() => {
            setBgVideo(
              `https://res.cloudinary.com/engagement-lab-home/video/upload/ac_none,q_80,c_crop,f_auto,w_${window.innerWidth}/v1668549678/sjm/intro.mp4`
            )
    }, []);
  return (
    <>
      <section className="relative mt-6 lg:mt-0 bg-black">
        <div className="flex flex-col justify-center w-full h-full absolute top-0 left-0 px-5 xl:px-10 bg-black/50 text-white">
          <h1 className='text-3xl md:text-7xl xl:text-8xl w-full'>Social Justice <br /> + Media Symposium</h1>
          <h3 className='mt-6 md:text-2xl xl:text-3xl xl:w-3/4'>The Social Justice + Media Symposium is an annual gathering of students, faculty, and stakeholders to
            explore how media practices and pedagogies can support equity, justice, and positive social change in daily
            life.</h3>
        </div>
       {bgVideo.length > 0 && <video playsInline autoPlay muted loop className='min-h-[40vh] bg-black/50'>
          <source
            src={bgVideo}
            type="video/mp4" />
          Your browser does not support the video tag.
        </video>}
      </section>
       <ParallaxBanner
        layers={[
          {
            speed: 10,
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
        <h2 className='text-3xl lg:text-6xl font-normal my-4 md:my-7'>The Symposium</h2>
        <div className='lg:ml-10 font-overpass'>
          <DocumentRenderer document={_.find(item, {name: 'The Symposium'}).content.document} componentBlocks={Blocks()} renderers={Doc()} />
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
        <h2 className='text-3xl lg:text-6xl font-normal my-4 md:my-7'>Academic Awards</h2>
        <div className='font-overpass'>
          <DocumentRenderer document={_.find(item, {name: 'Academic Awards'}).content.document} componentBlocks={Blocks()} renderers={Doc(rendererOverrides)} />
        </div>
      </div>
      <ParallaxBanner
      layers={[
        {
          speed: -20,
          children: (
            <div className="absolute inset-0">
              <Image id="bg-3" alt="A black and white photo of several people seated at a table on a stage during a conference panel presentation" imgId='sjm/bg-index-3'
                width={2200} className='w-full' />
            </div>
          )
        },
      ]}
      className="aspect-[2/1]" />
      <div className='bg-gradient-to-r from-clay via-pink to-wind text-white p-5 lg:px-48'>
        <h2 className='text-3xl lg:text-7xl font-normal my-4 md:my-7 lg:ml-28 w-full'>In Memory of<br />Moses Shumow</h2>

        <div className='flex flex-col gap-x-10 lg:flex-row'>
          <div className='w-full md:1/4 lg:w-1/2 flex-shrink-0'>
            <Image id="img-moses" alt="A photo of Moses Shumow smiling" imgId='sjm/moses_2_edited'
                width={600} transforms='f_auto,dpr_auto' className='w-full' />
          </div>
          <div className='md:1/2 font-overpass'>
            <DocumentRenderer document={_.find(item, {name: 'About Moses Shumow'}).content.document} componentBlocks={Blocks()} renderers={Doc(rendererOverrides)} />
          </div>
        </div>
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