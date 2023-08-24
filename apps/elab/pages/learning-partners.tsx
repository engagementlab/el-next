import { ReactElement, ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, HeadingStyle, Image, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../components/Layout';
import Divider from '../components/Divider';
import { CTAButton } from '@/components/Buttons';
import { News, Studio, StudioProject, Theme, Theming } from '@/types';
import CaptionedImage from '@/components/CaptionedImage';
import { Blocks, Doc } from '@/components/Renderers';
import { Gutter } from '@/components/Gutter';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import Logos from '@/components/Logos';

type LearningPartners = {
  intro: { document: any };
  introImage: {
    publicId: string;
  };
  introImageAltText: string;
  introImageCaption: string;
  what: { document: any };
  benefits: { document: any };

  spotlight: News[];
};

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
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true}>
      {page && (
        <div className="text-grey">
          <div className="flex flex-col lg:flex-row justify-start">
            <div className="px-4 md:px-20 lg:pl-20 my-0 lg:mt-14 xl:mt-16 xl:mb-20 w-full lg:w-4/6 xl:w-1/2">
              <h1 className="font-extrabold text-black">Learning Partners</h1>
              <div className="flex flex-col studios-center w-full">
                <DocumentRenderer
                  document={page.intro.document}
                  componentBlocks={Blocks()}
                  renderers={Doc(rendererOverrides)}
                />
              </div>
              <div className="hidden lg:block w-full mt-6 mb-12">
                <p className="text-xl lg:text-3xl font-extrabold uppercase">
                  Jump to:
                </p>
                <Button
                  label="What are Learning Partners?"
                  anchorId="what"
                  className="border-yellow text-yellow fill-yellow"
                />
                <Button
                  label="Benefits"
                  anchorId="benefits"
                  className="border-yellow text-yellow fill-yellow"
                />
                <Button
                  label="Learning Partner Spotlight"
                  anchorId="spotlight"
                  className="border-yellow text-yellow fill-yellow"
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

          <div id="what">
            <Gutter>
              <DocumentRenderer
                document={page.what.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
              <h4 className="font-bold my-2 uppercase text-yellow">Partners</h4>
              <Logos all={true} partners={[]} />
            </Gutter>
          </div>
          <Divider />
          <div id="benefits">
            <Gutter>
              <DocumentRenderer
                document={page.benefits.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </Gutter>
          </div>

          {page.spotlight && page.spotlight.length > 0 && <Divider />}

          <Gutter>
            {page.spotlight && page.spotlight.length > 0 && (
              <div id="spotlight">
                <h2 className="font-bold text-4xl">
                  Learning Partner Spotlight
                </h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.spotlight.map((item: News, i: number) => {
                    return (
                      <Link href={`/news/${item.key}`} className="group">
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
                            imageLabel="News"
                            width={200}
                            height={200}
                          />
                        )}

                        <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                          {item.title}
                        </h3>
                        <p>{item.summary}</p>
                      </Link>
                    );
                  })}
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
    'learningPartner',
    `learningPartner {
        intro { document }
        introImage {
          publicId
        }
        introImageAltText
        introImageCaption
        what { document }
        benefits { document }
        spotlight {
            title
            key
            summary 
            thumbnail { 
                publicId
            }
            thumbAltText
            initiatives
        }
      }
    `
  );

  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }
  const page = result[0] as LearningPartners;
  return {
    props: {
      page,
      error: null,
    },
  };
}
