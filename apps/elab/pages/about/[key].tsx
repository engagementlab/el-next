import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, Query } from '@el-next/components';

import Layout from '../../components/Layout';
import { Blocks, Doc, QuoteRenderer } from '../../components/Renderers';
import Logos from '@/components/Logos';
import Divider from '@/components/Divider';
import { motion } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import CaptionedImage from '@/components/CaptionedImage';
import { Theme, Theming } from '@/types';
import Script from 'next/script';
import { CTAButton } from '@/components/Buttons';

type About = {
  name: string;
  key: string;
  intro: {
    document: any;
  };
  content: {
    document: any;
  };
  headingImage: {
    publicId: string;
  };
  headingImageAltText: string;
  headingImageCaption?: string;
};

export default function AboutPage({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [dividerWidth, setDividerWidth] = useState(0);
  const [dividerOffset, setDividerOffset] = useState('');
  const rendererOverrides = {
    layout: (layout: number[], children: any[]) => {
      const flexClass = 'flex gap-x-5 flex-col-reverse xl:flex-row mx-6';
      if (layout.length === 2 && layout[0] === 1 && layout[1] === 1) {
        return (
          <div className={flexClass}>
            {children.map(
              (
                element:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined,
                i: Key | null | undefined
              ) => (
                <div
                  key={i}
                  className={`${
                    i === 0 ? 'w-full lg:w-1/2 flex-shrink-0 basis-1/2' : ''
                  }`}
                >
                  {element}
                </div>
              )
            )}
          </div>
        );
      }
      // [ ][ ][ ]
      else if (layout[0] === 1 && layout[1] === 1 && layout[2] === 1) {
        return (
          <div className={flexClass}>
            {children.map((element, i) => (
              <div key={i} className="w-full lg:w-1/3">
                {element}
              </div>
            ))}
          </div>
        );
      }
    },
    divider: () => {
      return (
        <div
          className="relative my-6"
          style={{ width: dividerWidth, left: `-${dividerOffset}` }}
        >
          <Divider />
        </div>
      );
    },
    paragraph: (children: ReactElement[]) => {
      return (
        <p className={`mx-6 ${children[0].props.node.text === '' && 'mt-6'}`}>
          {children}
        </p>
      );
    },

    heading: (level: number, children: ReactElement[], textAlign: any) => {
      return level === 2 ? (
        <h2
          id={children[0].props.node.text
            .toLocaleLowerCase()
            .replaceAll(/[^\w ]/g, '')
            .replaceAll(/[^a-z+A-Z+0-9+]/gi, '-')
            .replace(/-{2,}/g, '-')}
          className="text-3xl font-bold my-4 ml-6 tracking-wider"
        >
          {children}
        </h2>
      ) : (
        <h3 className="text-yellow text-xl lg:text-2xl font-extrabold uppercase mx-6 my-4">
          {children}
        </h3>
      );
    },
    quote: (children: ReactElement[]) => {
      return QuoteRenderer(children, item, Theming['none']);
    },
  };

  // We don't have any links on Mission/Values page
  const jumpLinks: { id: string; text: string }[] =
    item?.key === 'mission-values'
      ? []
      : (item?.content.document as any[])
          .filter((child: any) => {
            return child.type === 'heading' && child.level === 2;
          })
          .flatMap((heading) => {
            return {
              id: heading.children[0].text
                .toLocaleLowerCase()
                .replaceAll(/[^\w ]/g, '')
                .replaceAll(/[^a-z+A-Z+0-9+]/gi, '-')
                .replace(/-{2,}/g, '-'),
              text: heading.children[0].text,
            };
          });

  useEffect(() => {
    // if (document.getElementById('layout-daddy') !== null)
    setDividerWidth(document.getElementById('layout-daddy')?.clientWidth || 0);
    setDividerOffset(
      window.getComputedStyle(document.getElementById('layout-daddy')!)
        .paddingLeft
    );
  });

  return (
    <Layout error={error}>
      {item && (
        <>
          {/* {item?.key === 'donate' && (
            // Loads the donation form
            <>
              <Script
                src="https://sky.blackbaudcdn.net/static/donor-form-loader/2/main.js"
                strategy="beforeInteractive"
              />
              <Script strategy="afterInteractive">
                {`BBDonorFormLoader.newBlackbaudDonationFormZoned('renxt',
                  'p-PFuHvew1kEO665oQM8v7JA',
                  '63df0fa4-04c8-4dd1-bfe2-de4e800e4408', 'usa')`}
              </Script>
            </>
          )} */}

          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-grey"
          >
            <h1 className="m-6 font-extrabold text-4xl xl:text-6xl text-slate">
              {item?.key === 'donate' ? 'Support Our Work' : item.name}
            </h1>
            <div className="flex flex-col lg:flex-row">
              <div className="m-6 lg:w-1/2">
                <DocumentRenderer
                  document={item.intro.document}
                  componentBlocks={Blocks()}
                  renderers={Doc(rendererOverrides)}
                />
                {item?.key === 'donate' && (
                  <>
                    <div
                      className="relative my-6"
                      // style={{ width: dividerWidth, left: `-${dividerOffset}` }}
                    >
                      {/* <Divider />    */}
                      {/* //   <div id="blackbaud-donation-form_63df0fa4-04c8-4dd1-bfe2-de4e800e4408"></div> */}
                      <CTAButton
                        label="Donate Today"
                        link="https://host.nxt.blackbaud.com/donor-form?svcid=renxt&formId=63df0fa4-04c8-4dd1-bfe2-de4e800e4408&envid=p-PFuHvew1kEO665oQM8v7JA&zone=usa"
                        external={true}
                        icon="website"
                        theme={Theme.none}
                        className={`flex flex-row-reverse gap-x-5 items-center text-4xl font-semibold mb-8 w-[340px]`}
                      />
                    </div>
                  </>
                )}

                {jumpLinks && jumpLinks.length > 0 && (
                  <div className="hidden lg:flex flex-col flex-wrap m-6">
                    <p className="text-yellow text-xl lg:text-3xl font-extrabold uppercase">
                      Jump to:
                    </p>
                    {jumpLinks.map((link, i) => {
                      return (
                        <Button
                          label={link.text}
                          anchorId={link.id}
                          className="border-teal text-teal fill-yellow text-sm"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="max-w-lg">
                {item.headingImage ? (
                  <CaptionedImage
                    imgId={item.headingImage.publicId}
                    alt={item.headingImageAltText}
                    caption={item.headingImageCaption}
                    themeColor="bg-teal"
                  />
                ) : (
                  <ImagePlaceholder
                    imageLabel="Header"
                    width={800}
                    height={800}
                  />
                )}
              </div>
            </div>
            {item.content.document &&
              item.content.document[0].children[0].text &&
              item.content.document[0].children[0].text.length > 0 && (
                <div
                  className="relative my-6"
                  style={{ width: dividerWidth, left: `-${dividerOffset}` }}
                >
                  <Divider />
                </div>
              )}
            <div id="content">
              <DocumentRenderer
                document={item.content.document}
                componentBlocks={Blocks()}
                renderers={Doc(rendererOverrides)}
              />
              {item.key === 'our-approach' && (
                <div className="mx-6 my-6">
                  <h3 className="text-yellow text-xl lg:text-2xl font-extrabold uppercase mx-6 my-4">
                    Partner Organizations
                  </h3>
                  <Logos all={true} partners={[]} />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'abouts',
    `abouts {
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
    .map(({ key }) => `/about/${key}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'abouts',
    `abouts(where: { key: { equals: "${params!.key}" } }) {
        name
        key
        intro {
            document
        }
        headingImage {
            publicId
        }
        headingImageAltText
        headingImageCaption
        content {
           document(hydrateRelationships: true)
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
  const item = itemResult[0] as About;

  return { props: { item }, revalidate: 1 };
}
