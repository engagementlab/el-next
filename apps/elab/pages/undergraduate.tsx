import { ReactElement, ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, HeadingStyle, Image, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../components/Layout';
import Divider from '../components/Divider';
import { CTAButton } from '@/components/Buttons';
import { Studio, StudioProject, Theme, Theming } from '@/types';
import CaptionedImage from '@/components/CaptionedImage';
import { Blocks, Doc } from '@/components/Renderers';
import { Gutter } from '@/components/Gutter';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';

type UndergradPage = {
  intro: { document: any };
  introImage: {
    publicId: string;
  };
  introImageAltText: string;
  introImageCaption: string;
  socialImpactDesign: { document: any };
  projectSpotlight: StudioProject[];
};

const wrapperClass = 'my-0 xl:my-12 mt-14 mb-4 xl:mt-16 px-5 w-full';
const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      4: `text-lg font-bold mt-4 pl-4 pb-4 text-red border-red border-l-2 border-b-2`,
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
};

export default function Initiatives({
  page,
  studios,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true}>
      {page && (
        <div className="text-grey">
          <div className="flex flex-col lg:flex-row justify-start">
            <div className="px-4 md:px-20 lg:pl-20 my-0 lg:mt-14 xl:mt-16 xl:mb-20 w-full lg:w-4/6 xl:w-1/2">
              <h1 className="font-extrabold text-black">
                Undergraduate Curriculum
              </h1>
              <p className="flex flex-col studios-center w-full">
                <DocumentRenderer
                  document={page.intro.document}
                  componentBlocks={Blocks()}
                  renderers={Doc(rendererOverrides)}
                />
              </p>
              <div className="hidden lg:block w-full mt-6 mb-12">
                <p className="text-xl lg:text-3xl font-extrabold uppercase">
                  Jump to:
                </p>
                <Button
                  label="Undergraduate Minor: Social Impact Design"
                  anchorId="sid"
                  className="border-teal text-teal fill-teal text-sm"
                />
                <Button
                  label="Social Impact Studios"
                  anchorId="studios"
                  className="border-leaf text-leaf fill-leaf"
                />
                <Button
                  label="Project Spotlight"
                  anchorId="projects"
                  className="border-leaf text-leaf fill-leaf"
                />
              </div>
            </div>
            <div className="flex justify-center my-12 xl:max-w-md">
              <CaptionedImage
                alt={page.introImageAltText}
                imgId={page?.introImage.publicId}
                caption={page?.introImageCaption}
                themeColor="bg-teal"
              />
            </div>
          </div>
          <Divider />

          <Gutter>
            <DocumentRenderer
              document={page.socialImpactDesign.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
          </Gutter>
          <Divider />

          <Gutter>
            {studios && (
              <div id="studios">
                <h2 className="font-bold text-4xl">Social Impact Studios</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {studios.map((item: Studio, i: number) => {
                    let borderColor = 'border-yellow';
                    if (item.initiatives[0] === 'gunviolence')
                      borderColor = 'border-purple';
                    else if (item.initiatives[0] === 'climate')
                      borderColor = 'border-leaf';
                    return (
                      <Link href={`/studios/${item.key}`} className="group">
                        {item.thumbnail ? (
                          <Image
                            id={`thumb-${i}`}
                            alt={item.thumbAltText}
                            transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                            imgId={item.thumbnail.publicId}
                            width={460}
                            maxWidthDisable={true}
                            className="w-full"
                          />
                        ) : (
                          <ImagePlaceholder
                            imageLabel="Studio"
                            width={200}
                            height={200}
                          />
                        )}

                        <hr
                          className={`border-b-[15px] transition-transform origin-bottom ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
                        />
                        <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                          {item.name}
                        </h3>
                        <p>{item.shortDescription}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </Gutter>
          <Divider />

          <Gutter>
            {page.projectSpotlight && (
              <div id="projects">
                <h2 className="font-bold text-4xl">Project Spotlight</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.projectSpotlight.map(
                    (item: StudioProject, i: number) => {
                      let borderColor = 'border-yellow';
                      if (item.initiative === 'gunviolence')
                        borderColor = 'border-purple';
                      else if (item.initiative === 'climate')
                        borderColor = 'border-leaf';
                      return (
                        <Link
                          href={`/studios/projects/${item.key}`}
                          className="group"
                        >
                          {item.thumbnail ? (
                            <Image
                              id={`thumb-${i}`}
                              alt={item.thumbAltText}
                              transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                              imgId={item.thumbnail.publicId}
                              width={460}
                              maxWidthDisable={true}
                              className="w-full"
                            />
                          ) : (
                            <ImagePlaceholder
                              imageLabel="Project"
                              width={200}
                              height={200}
                            />
                          )}

                          <hr
                            className={`border-b-[15px] transition-transform origin-bottom ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
                          />
                          <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                            {item.name}
                          </h3>
                          <p>{item.shortDescription}</p>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </Gutter>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'undergraduates',
    `undergraduates {
        intro { document }
        introImage {
          publicId
        }
        introImageAltText
        introImageCaption
        socialImpactDesign { document }
        projectSpotlight {
            name
            key
            shortDescription 
            thumbnail { 
                publicId
            }
            thumbAltText
            initiative
        }
      }
    `
  );
  const studios = (await Query(
    'studios',
    `studios(
        where: {
            enabled: {
                equals: true
            }
        },
        orderBy: {
            createdDate: desc
        },
        take: 3
    ) {
        name
        key
        shortDescription 
        thumbnail { 
            publicId
        }
        thumbAltText
        initiatives
    }`
  )) as Studio[];
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }

  const page = result[0] as UndergradPage;
  return {
    props: {
      page,
      studios,
    },
  };
}
