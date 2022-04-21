import { InferGetStaticPropsType } from 'next';

import { Fade, SlideshowProps } from 'react-slideshow-image';

import { query } from '.keystone/api';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import Image from '../components/Image';
import Button from '../components/Button';
import Layout from '../components/Layout';
import HeadingStyle from '../components/HeadingStyle';

type HomePage = {
  id: string;
  intro: any;
  slides: any[];
}; 

const renderers: DocumentRendererProps['renderers'] = {
  // use your editor's autocomplete to see what other renderers you can override
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
  },
  block: {
    heading: ({ level, children, textAlign }) => {
      const customRenderers = {
        2: 'text-2xl text-coated font-semibold'
      };
      return HeadingStyle(level, children, textAlign, customRenderers);
    },
  },
};

const slidesProps: SlideshowProps = {
  duration: 4000,
  transitionDuration: 1000,
  infinite: true,
  easing: 'ease',
  arrows: false,
  pauseOnHover: false,
};

export default function Home({ homePage }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Layout>
        <div className='relative w-full mt-20 lg:max-h-screen overflow-clip'>
          <div className='flex flex-col items-center'>
            <div className='w-2/3 lg:mt-6 max-w-md text-center z-10'>
              <h2 className='sm:text-xl lg:text-2xl font-semibold'>Nearly every person in the U.S. will know someone who has been shot in their lifetime.</h2>
              <h1 className='text-xl lg:text-[2rem] font-bold text-purple mt-6'>Everyone has a story to tell.</h1>
              <Button className='' link='/archive' label='Listen to our stories' />
            </div>
          </div>


        </div>
        <div className='w-full'>
          <Fade {...slidesProps}>
            {homePage.slides.map((slide, i) => (
              <div key={`slide-${i}`} className='text-center'>
                <p className=' absolute w-full md:relative md:px-44  translate-y-20 md:translate-y-40 text-xl lg:text-2xl text-purple 
                before:fixed before:bg-lynx before:block before:content-{""} 
                before:-z-10 before:blur-xl before:rounded-full before:w-full 
                before:h-full md:before:blur-2xl md:before:h-20 md:before:-translate-y-1/4'>&ldquo;{slide.quote}&rdquo;</p>
                <Image id={'img-' + slide.image.publicId} alt={slide.altText} imgId={slide.image.publicId} width={1900} className='w-full aspect-[3/2]' lazy={true} />

              </div>
            ))}
          </Fade>
        </div>

        <p className='w-full text-sm lg:text-lg my-8 text-bluegreen text-center quote-shadow font-semibold '>Through local and collaborative storytelling, we seek to inspire solutions and interrupt cycles of gun violence.</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const homePage = await query.Home.findOne({
    where: { name: 'Home Page' },
    query: `
    id 
    intro { document } 
    slides {
      image
      {
        publicId
      }
      altText
      quote
    }`
  }) as HomePage;

  return {
    props: {
      homePage
    }
  };
}