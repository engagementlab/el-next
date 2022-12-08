import { InferGetStaticPropsType } from 'next';
import { SlideshowProps } from 'react-slideshow-image';
import {Button, Video} from '@el-next/components';
import Image from '@el-next/components/image';

import query from "../../../apollo-client";

import Layout from '../components/Layout';

type HomePage = {
  id: string;
  intro: any;
  slides: any[];
}; 

const slidesProps: SlideshowProps = {
  duration: 5000,
  transitionDuration: 2000,
  infinite: true,
  easing: 'ease',
  arrows: false,
  pauseOnHover: false,
};

export default function Home({ homePage }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const pseudoBlurBg = 'fixed bg-lynx block -z-10 blur-xl rounded-full w-full h-full md:blur-2xl md:h-20 md:-translate-y-1/4'.split(' ').map(c => {
    return `before:${c}`
  }).join(' ');
  
  return (
    <Layout>
      <div className='flex flex-col'>

        <div className='relative w-full mt-20 lg:max-h-screen overflow-clip'>
          <div className='flex flex-col items-center'>
            <div className='lg:mt-6 max-w-md text-center z-10'>
              <h2 className='sm:text-xl lg:text-2xl font-semibold'>Nearly every person in the U.S. will know someone who
                has been shot in their lifetime.</h2>
              <h1 className='text-xl lg:text-[2rem] font-bold text-purple mt-6'>Everyone has a story to tell.</h1>
              <Button link='/archive' label='Listen to our stories' />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col items-center -translate-y-10 md:-translate-y-20'>
          {/* <Image id='img-home' alt='' imgId='tngvi/homepage' width={2200} className='w-full' lazy={false} /> */}
        </div>
      </div>
      <Video videoLabel='Transforming Narratives of Gun Violence' videoUrl='https://player.vimeo.com/video/654694654'
        thumbUrl='https://res.cloudinary.com/engagement-lab-home/image/upload/v1670433897/tngvi/home-video-thumb.png' />
      <div className='flex flex-col items-center w-full text-center'>
        <h3 className='w-4/5 md:w-1/2 lg:w-full text-sm lg:text-2xl my-5 md:my-6 text-purple font-bold'>Transforming Narratives of Gun Violence</h3>
        <p
          className='w-4/5 md:w-1/2 lg:w-full text-sm lg:text-lg mb-6 md:my-6 xl:mb-10 text-bluegreen font-semibold '>
          Through local and collaborative storytelling, we seek to inspire solutions and interrupt cycles of gun
          violence.</p>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const result = await query(
    'homePage',
    `homePage(where: { name: { equals: "Home Page" } }) {
      intro {
        document
      }
      slides {
        image {
          publicId
        }
        altText
        quote 
      }
    }`
  );
  const homePage = result[0] as HomePage;

  return {
    props: {
      homePage
    }
  };
}