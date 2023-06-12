import { HTMLProps, HtmlHTMLAttributes, ReactNode, useState } from 'react';
import { InferGetStaticPropsType } from 'next';

import { Button, HeadingStyle, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../components/Layout';
import { AnimatePresence, motion, wrap } from 'framer-motion';

type AboutPage = {
  intro: string;
  slides: [
    {
      image: {
        publicId: string;
      };
      altText: string;
    }
  ];
};

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    return (
      <p
        className={`${level === 3 && 'text-2xl text-bluegreen leading-none'} ${
          level === 4 && 'text-xl text-coated'
        } font-semibold mb-8`}
        style={{ textAlign }}
      >
        {children}
      </p>
    );
  },
};
const valuesRendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      4: 'text-xl font-semibold text-coated my-8',
      5: 'text-lg font-extrabold text-purple',
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 0 : -1000,
      opacity: 0,
    };
  },
};

export default function Initiatives({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [[slide, direction], setPage] = useState([0, 0]);
  const images = [
    'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
    'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
    'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
  ];
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, slide);

  const paginate = (newDirection: number) => {
    setPage([slide + newDirection, newDirection]);
  };

  const dotClass: HTMLProps<HTMLElement>['className'] =
    'relative w-10 h-3 mx-1 rounded-full inline-block bg-purple transition-all hover:scale-125 cursor-pointer';
  return (
    <Layout error={error} fullBleed={true}>
      <div
        id="tngvi"
        className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full"
      >
        <h2>Transforming Narratives of Gun Violence</h2>
        <div>
          <p>{page?.intro}</p>
          <Button label="→ Projects" link="/archive?gunviolence" />
        </div>
        <div className="flex flex-col w-1/4 pb-4 overflow-hidden">
          <div className="relative flex justify-between items-center min-h-[365px]">
            {/* <div className="prev" onClick={() => paginate(-1)}>
              {'‣'}
            </div> */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                className="absolute min-h-max mx-4"
                key={slide}
                src={images[imageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 200, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              />
            </AnimatePresence>
            {/* <div className="relative left-4" onClick={() => paginate(1)}>
              {'‣'}
            </div> */}
          </div>
          <li className="flex justify-center mt-3">
            {images.map((image, index) => (
              <label
                htmlFor="img-1"
                className={`${dotClass} ${
                  index !== imageIndex && 'opacity-50'
                }`}
                id="img-dot-1"
                onClick={(event) => {
                  setPage([index, 1]);
                }}
              ></label>
            ))}
          </li>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'initiative',
    `initiative(where: { name: "Initiative Name" }) {
        intro 
        slides {
          image {
            publicId
          }
          altText
        }
      }`
  );
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }

  const page = result as AboutPage;
  return {
    props: {
      page,
    },
  };
}
