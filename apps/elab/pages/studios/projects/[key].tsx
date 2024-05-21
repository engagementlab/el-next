import { ReactElement, ReactNode, useEffect } from 'react';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, Image, Query } from '@el-next/components';
import { Video } from '@el-next/components/video';
import { Video as VideoV2 } from '@el-next/components/video.v2';

import Layout from '../../../components/Layout';
import {
  Blocks,
  Doc,
  Heading,
  QuoteRenderer,
} from '../../../components/Renderers';

import {
  CustomEase,
  DefaultWhereCondition,
  StudioProject,
  Theming,
} from '@/types';
import Logos from '@/components/Logos';
import Divider from '@/components/Divider';
import { CTAButton } from '@/components/Buttons';
import { PeopleList } from '@/components/People';
import { Gutter } from '@/components/Gutter';

interface ProjectState {
  trailerOpen: boolean;
  toggleTrailerVideo: () => void;
  videoOpen: boolean;
  toggleVideo: () => void;
  reset: () => void;
}

// Create store with Zustand
const useStore = create<ProjectState>()(
  subscribeWithSelector((set) => ({
    trailerOpen: false,
    videoOpen: false,
    toggleTrailerVideo: () =>
      set((state) => {
        return {
          ...state,
          trailerOpen: !state.trailerOpen,
        };
      }),
    toggleVideo: () =>
      set((state) => {
        return {
          ...state,
          videoOpen: !state.videoOpen,
        };
      }),
    reset: () =>
      set((state) => {
        return {
          ...state,
          trailerOpen: false,
          videoOpen: false,
        };
      }),
  }))
);

export default function Project({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dynamicRoute = useRouter().asPath;
  const { trailerOpen, videoOpen, toggleTrailerVideo, toggleVideo, reset } =
    useStore((state) => state);

  // Reset toggles
  useEffect(() => {
    reset();
  }, [dynamicRoute]);

  if (item) {
    const theming =
      Theming[item.initiative === 'gunviolence' ? 'tngv' : 'tnej'];
    const videoColor = {
      stroke: theming.arrow,
      fill: theming.fill,
      fillRgb: theming.fillRgb,
      bg: theming.videoBg || theming.secondaryBg,
      seekbar: theming.fillVideo || theming.arrowHex,
      buttons: '#fff',
    };
    const rendererOverrides = {
      layout: (layout: number[], children: any[]) => {
        const flexClass = 'flex gap-x-5 flex-col-reverse lg:flex-row';
        // [  ][ ]
        if (layout[0] === 2 && layout[1] === 1) {
          return (
            <div className={flexClass}>
              {children.map((element, i) => (
                <div key={i} className={`${i === 0 ? 'w-full lg:w-3/4' : ''}`}>
                  {element}
                </div>
              ))}
            </div>
          );
        }
        // [ ][  ]
        else if (layout[0] === 1 && layout[1] === 2) {
          return (
            <div className={flexClass}>
              {children.map((element, i) => (
                <div key={i} className="w-full lg:w-3/4">
                  {element}
                </div>
              ))}
            </div>
          );
        } else if (layout[0] === 1 && layout[1] === 1) {
          return (
            <div className={flexClass}>
              {children.map((element: any, i: number | null | undefined) => (
                <div
                  key={i}
                  className="w-full lg:w-1/2 flex-grow flex-shrink-0 basis-1/2"
                >
                  {element}
                </div>
              ))}
            </div>
          );
        }
      },
      heading: (level: number, children: ReactNode, textAlign: any) => {
        const customRenderers = {
          3: `text-xl font-extrabold uppercase my-4 ${theming.heading}`,
        };
        return Heading(level, children, textAlign, customRenderers);
      },
      quote: (children: ReactElement[]) => {
        return QuoteRenderer(children, item, theming);
      },
    };

    const Media = () => {
      if (item.video)
        return (
          <div
            className={`relative transition-all duration-500 bg-blue ${CustomEase} ${
              videoOpen
                ? 'basis-full min-h-[50vh]'
                : 'max-w-sm min-h-[200px] md:min-h-[255px] lg:max-w-xl lg:mx-3 basis-2/5'
            }`}
          >
            {' '}
            (
            <button
              onClick={() => toggleVideo()}
              className={`transition-all duration-500 ${CustomEase} absolute right-0 mr-2 mt-2 z-50 inline-block w-12 h-12 hover:scale-125`}
            >
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                className={theming.fill}
              >
                <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
              </svg>
            </button>
            ){/* Close full movie */}
            {/* {videoOpen &&}
            <div className="group w-full min-h-[inherit]">
              <div
                id="video"
                className={`${
                  videoOpen ? 'relative mb-5 h-full' : ``
                } min-h-[inherit]`}
              >
                <div className={!videoOpen ? 'hidden' : 'block'}>
                  <VideoV2
                    key="video-player-project"
                    videoLabel={`Trailer for ${item.name} `}
                    videoFile={item.video.file}
                    captionsFile={item.captions?.url}
                    thumbUrl=""
                    theme={videoColor}
                    noUi={true}
                    play={true}
                  />
                </div>
                {!videoOpen && !item.trailerThumbnail && (
                  <Image
                    id="thumb"
                    alt={item.thumbAltText}
                    imgId={item.thumbnail.publicId}
                    transforms="f_auto,dpr_auto,c_fill,g_face"
                  />
                )}
              </div>
              {item.trailerVideo && (
                <div className={videoOpen ? 'hidden' : 'block'}>
                  <VideoV2
                    key="video-player-project"
                    videoLabel={`Trailer for ${item.name} `}
                    videoFile={item.trailerVideo.file}
                    captionsFile={item.captions?.url}
                    thumbUrl={
                      item.trailerThumbnail
                        ? item.trailerThumbnail.publicUrl
                        : ''
                    }
                    theme={videoColor}
                    noUi={true}
                    play={trailerOpen}
                  />
                  {!trailerOpen && (
                    <button
                      className={`absolute transition-all duration-200 ${CustomEase} bottom-10 md:bottom-12 left-5 flex flex-row items-center gap-x-3 border-b-2 border-white cursor-pointer group-hover:pr-12`}
                      onClick={() => toggleTrailerVideo()}
                    >
                      <svg
                        height="48"
                        width="48"
                        viewBox="0 -960 960 960"
                        className={`inline transition-all duration-200 ${CustomEase} group-hover:scale-125`}
                      >
                        <path
                          d="m392-313 260-169-260-169v338ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"
                          fill="white"
                          className={`group-hover:${theming.fill}`}
                        />
                      </svg>
                      <h4 className="text-white font-semibold text-3xl">
                        Watch the trailer
                      </h4>
                    </button>
                  )}
                </div>
              )}
            </div> */}
          </div>
        );

      // if (item.videoId)
      //   return (
      //     <div
      //       className={`relative transition-all duration-500 ${CustomEase} ${
      //         videoOpen
      //           ? 'w-full basis-full min-h-[50vh]'
      //           : 'max-w-sm min-w-[300px] min-h-[200px] md:min-h-[255px] lg:mx-3 lg:max-w-xl lg:min-w-[450px] basis-2/5'
      //       }`}
      //     >
      //       <div className="group w-full min-h-[inherit]">
      //         <div
      //           id="video"
      //           className={`${
      //             videoOpen ? 'relative mb-5 h-full' : ``
      //           } min-h-[inherit]`}
      //         >
      //           <Video
      //             videoLabel={`Trailer for ${item.name} `}
      //             videoUrl={`https://player.vimeo.com/video/${
      //               videoOpen ? item.videoId : item.trailerId
      //             }`}
      //             thumbUrl={
      //               item.trailerThumbnail ? item.trailerThumbnail.publicUrl : ''
      //             }
      //             play={trailerOpen || videoOpen}
      //             noUi={true}
      //           />
      //           {!videoOpen && !item.trailerThumbnail && (
      //             <Image
      //               id="thumb"
      //               alt={item.thumbAltText}
      //               imgId={item.thumbnail.publicId}
      //               transforms="f_auto,dpr_auto,c_fill,g_face"
      //             />
      //           )}
      //         </div>
      //         {!videoOpen && !trailerOpen && item.trailerId && (
      //           <button
      //             className="absolute bottom-10 md:bottom-12 left-5 flex flex-row items-center gap-x-3 border-b-2 border-white cursor-pointer group-hover:w-80"
      //             onClick={() => toggleTrailerVideo()}
      //           >
      //             <svg
      //               height="48"
      //               width="48"
      //               viewBox="0 -960 960 960"
      //               className={`inline transition-all duration-200 ${CustomEase} group-hover:scale-125`}
      //             >
      //               <path
      //                 d="m392-313 260-169-260-169v338ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"
      //                 fill="white"
      //                 className={`group-hover:${theming.fill}`}
      //               />
      //             </svg>
      //             <h4 className="text-white font-semibold text-3xl">
      //               Watch the trailer
      //             </h4>
      //           </button>
      //         )}
      //       </div>
      //     </div>
      //   );

      // return (
      //   <div className="lg:mx-3 lg:max-w-xl lg:min-w-[450px] basis-2/5">
      //     <Image
      //       id="thumb"
      //       alt={item.thumbAltText}
      //       imgId={item.thumbnail.publicId}
      //       transforms="f_auto,dpr_auto,c_fill,g_face"
      //     />
      //   </div>
      // );
    };

    return (
      <Layout
        error={error}
        breadcrumbs={[{ label: 'Studio Projects', href: '/studios/projects' }]}
        theme={theming.theme}
        fullBleed={true}
        title={`${item.name} - Studio Projects`}
      >
        {item && (
          <div className="text-grey">
            <Gutter>
              <h1 className="font-extrabold text-6xl text-slate">
                {item.name}
              </h1>
              <div className="flex flex-col flex-wrap lg:flex-row items-center gap-x-7 mt-6">
                {/* VIDEO/IMAGE */}
                <Media />
                <div className="basis-1/3 mt-6 xl:basis-1/2">
                  <h2
                    className={`uppercase text-xl lg:text-3xl font-extrabold ${theming.heading}`}
                  >
                    About
                  </h2>
                  <div className="flex flex-col items-center">
                    <div className="my-6">
                      <DocumentRenderer
                        document={item.about.document}
                        componentBlocks={Blocks(theming)}
                        renderers={Doc(rendererOverrides)}
                      />
                    </div>
                    {item.videoId && !videoOpen && (
                      <CTAButton
                        label="Watch the film"
                        link="/"
                        icon="play"
                        theme={theming.theme}
                        className={`flex flex-row-reverse gap-x-3 items-center text-3xl font-semibold mb-8 ${theming.fill}`}
                        onClick={() => toggleVideo()}
                      />
                    )}
                    {item.buttons &&
                      item.buttons.length > 0 &&
                      item.buttons.map((button) => (
                        <CTAButton
                          label={button.label}
                          external={true}
                          link={button.url}
                          icon={button.icon}
                          theme={theming.theme}
                          className={`flex flex-row-reverse gap-x-3 items-center text-3xl font-semibold mb-8 ${theming.fill}`}
                        />
                      ))}
                  </div>
                </div>
                <div className="hidden lg:block w-3/4 lg:w-full">
                  <h2
                    className={`uppercase text-xl lg:text-3xl my-3 font-extrabold ${theming.heading}`}
                  >
                    Jump to:
                  </h2>
                  <Button
                    label="A Look Inside the Co-Creation Process"
                    anchorId="cocreation"
                    className={`text-sm ${theming.text} ${theming.fill}
                      `}
                  />
                  <div className="flex flex-row gap-x-5">
                    {item.impact && item.impact.document.length > 2 && (
                      <Button
                        label="Impact"
                        anchorId="impact"
                        className={`text-sm ${theming.text} ${theming.fill}
                    `}
                      />
                    )}
                    <Button
                      label="Team"
                      anchorId="team"
                      className={`text-sm ${theming.text} ${theming.fill}
                    `}
                    />
                    {/* <Button
                      label="Related Projects"
                      anchorId="related"
                      className={`text-sm ${theming.text} ${
                        theming.fill
                      }`}
                    /> */}
                  </div>
                </div>
              </div>
            </Gutter>
            <Divider color="bg-green" />
            <Gutter>
              <div id="cocreation">
                <h2 className="font-bold text-5xl my-3">
                  A Look Inside the Co-Creation Process
                </h2>
                <DocumentRenderer
                  document={item.coCreation.document}
                  componentBlocks={Blocks(theming)}
                  renderers={Doc(rendererOverrides)}
                />
              </div>

              <h2
                className={`text-xl font-extrabold uppercase ${theming.heading}`}
              >
                Partners
              </h2>
              <Logos partners={item.partners} />
            </Gutter>

            {item.impact && item.impact.document.length > 2 && (
              <>
                <Divider color="bg-green" />
                <Gutter>
                  <div id="impact">
                    <h2 className="font-bold text-5xl my-3">Impact</h2>
                    <DocumentRenderer
                      document={item.impact.document}
                      componentBlocks={Blocks(theming)}
                      renderers={Doc(rendererOverrides)}
                    />
                  </div>
                </Gutter>
              </>
            )}
            <Divider color="bg-green" />
            <Gutter>
              <h2 className="font-bold text-5xl my-3" id="team">
                Project Team
              </h2>
              {item.studioStudents && item.studioStudents.length > 0 && (
                <PeopleList
                  list={item.studioStudents}
                  heading="Students"
                  theme={theming}
                  index={0}
                />
              )}
              {item.learningPartners && item.learningPartners.length > 0 && (
                <PeopleList
                  list={item.learningPartners}
                  heading="Learning Partners"
                  theme={theming}
                  index={1}
                />
              )}
              <div className="flex flex-col lg:flex-row gap-x-7">
                {item.instructors && item.instructors.length > 0 && (
                  <div className="flex-grow">
                    <PeopleList
                      list={item.instructors}
                      heading="Studio Instructors"
                      theme={theming}
                      index={2}
                    />
                  </div>
                )}
                <div>
                  {item.studioStaff && item.studioStaff.length > 0 && (
                    <PeopleList
                      list={item.studioStaff}
                      heading="Engagement Lab Staff"
                      theme={theming}
                      index={3}
                    />
                  )}
                </div>
              </div>
            </Gutter>
          </div>
        )}
      </Layout>
    );
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'studioProjects',
    `studioProjects(${DefaultWhereCondition()}) {
        key
    }`
  );
  if (items.error) {
    return {
      paths: [],
      fallback: true,
    };
  }
  const paths = (items as { key: string }[])
    .filter(({ key }) => !!key)
    .map(({ key }) => `/studios/projects/${key}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'studioProjects',
    `studioProjects(where: { key: {equals: "${params!.key}"} }) {
            name
            key
            initiative
            about {
              document(hydrateRelationships: true)
            }
            buttons
            semester {
              name
            }
            shortDescription
            thumbAltText
            thumbnail {
              publicId
              publicUrl
            }
            trailerId
            trailerThumbnail {
              publicUrl
            }
            trailerThumbAltText
            videoId

            captions { 
              url 
            }
            video { 
              file 
            }
            trailerCaptions { 
              url 
            }
            trailerVideo {
              file
            }
            
            partners
            coCreation {
              document(hydrateRelationships: true)
            }
            impact {
              document(hydrateRelationships: true)
            }
    
            instructors {
              name
              secondaryTitle
              key
              title
              image {
                publicId
              }
            }
            learningPartners {
              name
              key
              title
              image {
                publicId
              }
            }
            studioStudents {
              name
              key
              title
              secondaryTitle
              image {
                  publicId
              }  
            }
            studioStaff {
              name
              key
              title
              secondaryTitle
              image {
                  publicId
              }  
            }
        }`
  );
  if (itemResult.error) {
    return {
      props: {
        error: itemResult.error,
        item: null,
      },
    };
  }
  const item = itemResult[0] as StudioProject;

  // const relatedItems = (await query.MediaItem.findMany({
  //     where: {
  //         filters: {
  //             some:{
  //                 OR: [
  //                     { name: { equals: "2022" } },
  //                     { name: { equals: "Rural Voices" } }
  //                 ]
  //             }
  //         }
  //     },
  //     query: 'title key filters { key name } shortDescription thumbnail { publicId }',
  // })) as MediaItem[];
  return { props: { item }, revalidate: 1 };
}
