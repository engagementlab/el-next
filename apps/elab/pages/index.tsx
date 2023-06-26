import { Variants, motion } from 'framer-motion';
import Layout from '../components/Layout';
import CTAButton from '@/components/CTAButton';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Theme } from '@/types';
import { Parallax } from 'react-scroll-parallax';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [targetElement, setTarget] = useState();
  const targetRef = useRef();
  useEffect(() => {
    setTarget(targetRef.current);
  }, [targetRef]);

  const cardVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        // type: 'spring',
        // bounce: 0.4,
        duration: 1.8,
      },
    },
  };

  return (
    <Layout
      topBgElement={
        <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-red/[.2] via-green-blue/[.2] to-yellow/[.5]"></div>
      }
    >
      <div
        className={`flex flex-col max-h-screen items-center overflow-y-scroll no-scrollbar`}
      >
        <div
          className=" min-h-[300vh] w-full relative text-3xl"
          ref={targetElement}
        >
          <motion.div
            className=" flex items-center"
            // initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
          >
            <motion.div className="card" variants={cardVariants}>
              Advancing peace, equity, & justice through collaborative
              <div className="text-yellow text-4xl font-extrabold">
                storytelling
                <hr className="h-1 border-none bg-red w-full" />
                <hr className="h-1 my-1 border-none bg-green-blue w-full" />
                <hr className="h-1 border-none bg-yellow w-full" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="h-screen flex items-center bg-green-blue bg-opacity-30 top-48 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            variants={cardVariants}
          >
            <div>Storytelling definition</div>
          </motion.div>

          <motion.div
            className="h-screen flex items-center bg-yellow bg-opacity-30 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            variants={cardVariants}
          >
            <div>Research definition</div>
          </motion.div>

          <motion.div
            className="h-screen flex items-center bg-red bg-opacity-30 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            variants={cardVariants}
          >
            <div>Design definition</div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-14 mb-10 xl:mt-16 md:px-20xl:px-24 w-full">
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="lg:w-1/2 lg:ml-14 px-5">
            <div className="inline p-2 mb-4 bg-purple text-sm text-white font-bold rounded-large">
              Project
            </div>
            <h2 className="text-3xl text-grey font-bold">
              Transforming Narratives of Gun Violence
            </h2>
            <div className="flex flex-col items-center text-grey">
              This is a homepage blurb. These text boxes should allow for
              formatting, unlike the shorter blurbs pulled for archive listings,
              so that we can format dates and location info for events, or add
              additional links beyond the call to action button if needed.
              Accent colors should correspond to the featured item’s initiative:
              teal for climate, purple for TNGV.
              <div className="mt-8">
                <CTAButton
                  label="Learn more"
                  link="/initiatives/gunviolence"
                  theme={Theme.gunviolence}
                />
              </div>
            </div>
          </div>
          {/* {props.item.thumbnail ? (
                <Image
                  id={`thumb-${props.item.key}`}
                  alt={`Thumbnail for media with name "${props.item.title}"
                            `}
                  imgId={props.item.thumbnail.publicId}
                  maxWidth={800}
                  className="w-full"
                />
              ) : ( */}
          <ImagePlaceholder imageLabel="Home" width={335} height={200} />
          {/* )}  */}
        </div>
      </div>
    </Layout>
  );
}
