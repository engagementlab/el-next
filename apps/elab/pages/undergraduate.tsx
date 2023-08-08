import { ReactElement, ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, HeadingStyle, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../components/Layout';
import Divider from '../components/Divider';
import { CTAButton } from '@/components/Buttons';
import { Studio, Theme, Theming } from '@/types';
import CaptionedImage from '@/components/CaptionedImage';
import { Blocks, Doc } from '@/components/Renderers';
import { Gutter } from '@/components/Gutter';

type UndergradPage = {
  intro: string;
  introImage: {
    publicId: string;
  };
  introImageAltText: string;
  introImageCaption: string;
  socialImpactDesign: { document: any };
};

const wrapperClass = 'rmy-0 xl:my-12 mt-14 mb-4 xl:mt-16 px-5 w-full';
const rendererOverrides = {
  paragraph: (children: ReactElement[]) => {
    return <p className={wrapperClass}>{children}</p>;
  },
};

export default function Initiatives({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true}>
      {/* <Gutter> */}
      {page && (
        <div className="text-grey">
          <div className="flex flex-col lg:flex-row justify-start">
            <div className="px-4 md:px-20 lg:pl-20 my-0 lg:mt-14 xl:mt-16 xl:mb-20 w-full lg:w-4/6 xl:w-1/2">
              <h1 className="font-extrabold text-black">
                Social Impact Initiatives
              </h1>
              {/* <p className="flex flex-col items-center w-full">{page?.intro}</p> */}
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
                  anchorId="tnej"
                  className="border-leaf text-leaf fill-leaf"
                />
                <Button
                  label="Project Spotlight"
                  anchorId="tnej"
                  className="border-leaf text-leaf fill-leaf"
                />
              </div>
            </div>
            {/* </Gutter> */}
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
          {/* {items &&
          <div id="studios" className="lg:mx-14 xl:mx-24">          
            items.map((item: Item, i: number) => {
              <div>
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
                      width={335}
                      height={200}
                    />
                  )}
                </div>
                <hr
                  className={`border-b-[15px] transition-transform origin-bottom ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
                />
              </div>
              <h3 className="text-bluegreen hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                {item.name || item.title}{' '}
                {external && (
                  <svg
                    viewBox="0 0 20 20"
                    width="20"
                    height="20"
                    className="inline ml-1"
                  >
                    <g transform="matrix(0.042265, 0, 0, 0.042265, 0, 2)">
                      <g>
                        <path
                          d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374   c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13   c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5   C283.922,7.851,276.071,0,266.422,0z"
                          className=" fill-bluegreen transition-all group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:fill-green-blue"
                        ></path>
                        <path
                          d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137   c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"
                          className=" fill-bluegreen transition-all group-hover:fill-green-blue"
                        ></path>
                      </g>
                    </g>
                  </svg>
                )}
              </h3>
              <p>
                {item.summary.length > 150
                  ? `${item.summary.substring(
                      0,
                      item.summary.substring(0, 150).lastIndexOf(' ')
                    )}...`
                  : item.summary}
              </p>
            </>
          </div> */}
          <Divider />
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
