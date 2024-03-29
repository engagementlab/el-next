import { ReactNode, useEffect, useRef, useState } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ParallaxBanner } from 'react-scroll-parallax';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import _ from 'lodash';

import { Image, Query } from '@el-next/components';
import { HeadingStyle } from '@el-next/components/headingStyle';

import { Blocks, Doc } from '../components/Renderers';

type Home = {
  name: string;
  content: any;
};
const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      3: 'text-4xl font-medium tracking-wider my-4',
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
  layout: (layout: any, children: any) => {
    const flexClass = 'flex gap-y-5 flex-col xl:flex-row justify-between';
    if (layout[0] === 1 && layout[1] === 1) {
      return (
        <div className={flexClass}>
          {children.map((element: any, i: number) => (
            <div key={i} className="w-full xl:w-1/2">
              {element}
            </div>
          ))}
        </div>
      );
    }
  },
};
export default function Home({
  item,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [bgTargetElement, setBgTargetVideo] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef();

  const scrollToLogos = () => {
    document.querySelector('#partners')!.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setBgTargetVideo(bgVideoRef.current);

    if (videoPlayerRef.current) {
      videoPlayerRef.current.onplay = () => {
        setShowVideo(true);
      };
      videoPlayerRef.current.src =
        'https://player.vimeo.com/progressive_redirect/playback/920577441/rendition/540p/file.mp4?loc=external&signature=741d8d2cb33d4408adbd2abce1877c81090dee327fa3e92c15ef661fa1e7319c';
      // `https://player.vimeo.com/progressive_redirect/playback/920577441/rendition/720p/file.mp4?loc=external&signature=f1b99cf205108b09a5242524bf604028e4a51b6a6c5cb02e7f5e4c43238ae845`
      // 'https://player.vimeo.com/progressive_redirect/playback/920577441/rendition/240p/file.mp4?loc=external&signature=23509e3227c1eef8b1b8880da3a9a3d07de7199b97473d2f98562c52b9f3eb5d'
    }
  }, [bgVideoRef]);

  return (
    <>
      <section ref={bgTargetElement} className="relative mt-6 lg:mt-0 bg-black">
        <video
          ref={videoPlayerRef}
          playsInline
          autoPlay
          muted
          loop
          className={`${
            showVideo ? 'h-full' : 'h-0'
          } min-h-[40vh] bg-black/50 w-full`}
        >
          {/* <source src={bgVideo /.} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>

        {!showVideo && (
          <div className="flex justify-center items-center min-h-[90vh]">
            <svg
              width="300"
              height="300"
              viewBox="0 0 24 24"
              className="fill-white"
            >
              <path
                d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
                className="animate-spin origin-center"
              />
            </svg>
          </div>
        )}

        <div className="flex flex-col items-center w-full h-full absolute top-0 left-0 px-5 xl:px-10 bg-black/50 text-white z-20">
          <Image
            id="logos"
            alt="Engagement Lab and Emerson College logos"
            imgId="sjm/logos/elab-emerson"
            // width={500}
            transforms="f_auto,dpr_auto"
            className="max-w-sm md:max-w-lg"
          />
          <h1 className="text-3xl md:text-7xl xl:text-8xl md:mt-8 w-full text-center">
            Social Justice <br /> + Media Symposium
          </h1>
          <h3 className="md:text-2xl xl:text-3xl mt-1 md:mt-8 xl:w-3/4">
            An annual gathering of students, faculty, and stakeholders to
            explore how media practices and pedagogies can support equity,
            justice, and positive social change in daily life.
          </h3>
          <h4 className="md:text-3xl xl:text-4xl mt-1 md:mt-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToLogos();
              }}
            >
              View All Partners
            </a>
          </h4>
        </div>
      </section>
      <ParallaxBanner
        layers={[
          {
            speed: 10,
            children: (
              <div className="absolute inset-0">
                <Image
                  id="bg-1"
                  alt="A black and white photo of two women working at a table"
                  imgId="sjm/bg-index-1"
                  width={2200}
                  className="w-full"
                />
              </div>
            ),
          },
        ]}
        className="aspect-[2/1]"
      />
      <div className="bg-blossom text-white p-5 lg:px-48 xl:px-96">
        <h2 className="text-3xl lg:text-6xl font-normal my-4 md:my-7">
          The Symposium
        </h2>
        <div className="lg:ml-10 font-overpass">
          <DocumentRenderer
            document={_.find(item, { name: 'The Symposium' }).content.document}
            componentBlocks={Blocks()}
            renderers={Doc()}
          />
        </div>
      </div>
      <ParallaxBanner
        layers={[
          {
            speed: -20,
            children: (
              <div className="absolute inset-0">
                <Image
                  id="bg-2"
                  alt="A black and white photo of numerous people watching a presentation"
                  imgId="sjm/bg-index-2"
                  width={2200}
                  className="w-full"
                />
              </div>
            ),
          },
        ]}
        className="aspect-[2/1]"
      />
      <div className="bg-blue text-white p-5 lg:px-48 xl:px-96">
        <h2 className="text-3xl lg:text-6xl font-normal my-4 md:my-7">
          Academic Awards
        </h2>
        <div className="font-overpass">
          <DocumentRenderer
            document={
              _.find(item, { name: 'Academic Awards' }).content.document
            }
            componentBlocks={Blocks()}
            renderers={Doc(rendererOverrides)}
          />
        </div>
      </div>
      <ParallaxBanner
        layers={[
          {
            speed: -20,
            children: (
              <div className="absolute inset-0">
                <Image
                  id="bg-3"
                  alt="A black and white photo of several people seated at a table on a stage during a conference panel presentation"
                  imgId="sjm/bg-index-3"
                  width={2200}
                  className="w-full"
                />
              </div>
            ),
          },
        ]}
        className="aspect-[2/1]"
      />
      <div className="bg-gradient-to-r from-clay via-pink to-wind text-white p-5 lg:px-48">
        <h2 className="text-3xl lg:text-7xl font-normal my-4 md:my-7 lg:ml-28 w-full">
          In Memory of
          <br />
          Moses Shumow
        </h2>

        <div className="flex flex-col gap-x-10 lg:flex-row">
          <div className="w-full md:1/4 lg:w-1/2 flex-shrink-0">
            <Image
              id="img-moses"
              alt="A photo of Moses Shumow smiling"
              imgId="sjm/moses_2_edited"
              width={600}
              transforms="f_auto,dpr_auto"
              className="w-full"
            />
          </div>
          <div className="md:1/2 font-overpass">
            <DocumentRenderer
              document={
                _.find(item, { name: 'About Moses Shumow' }).content.document
              }
              componentBlocks={Blocks()}
              renderers={Doc(rendererOverrides)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'homes',
    `homes {
      name
      content {
        document
      }
  }`
  );
  const item = itemResult as Home;

  return { props: { item }, revalidate: 1 };
}
