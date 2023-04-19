import { ReactNode, useEffect, useState } from 'react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Image, { ImageUrl } from '@el-next/components/image';
import { HeadingStyle } from '@el-next/components/headingStyle';

import _ from 'lodash';

import query from '../../../../apollo-client';

import { Blocks, Doc } from '../../components/Renderers';

type Award = {
  name: string;
  intro: any;
  apply: any;
  pastRecipients: any;
  bgImage1: {
    publicId: string;
  };
};

const imageOverride = (props: any) => {
  return (
    <Image
      id={'img-' + props.image.publicId}
      alt={props.image.alt}
      imgId={props.image.publicId}
      aspectDefault={true}
      className="max-w-[210px]"
    />
  );
};

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      3: 'text-xl font-medium tracking-wide my-4',
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
  layout: (layout: any, children: any) => {
    const flexClass = 'flex gap-x-5 flex-col md:flex-row justify-between';
    if (
      (layout[0] === 1 && layout[1] === 2) ||
      (layout[0] === 2 && layout[1] === 1)
    ) {
      return (
        <div className={flexClass}>
          {children.map((element: any, i: number) => (
            <div key={i} className={`${i === 1 ? 'w-full lg:w-4/5' : ''}`}>
              {element}
            </div>
          ))}
        </div>
      );
    } else return <div>{children}</div>;
  },
};

export default function Award({
  item,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [bgImg1, setBgImg1] = useState('');

  useEffect(() => {
    if (item.bgImage1)
      setBgImg1(
        ImageUrl({
          imgId: item.bgImage1.publicId,
          width: window.innerWidth,
          transforms: `f_auto,dpr_auto,c_crop,ar_4:3,e_colorize:80,co_rgb:aa7b5f,o_60,w_${window.innerWidth}`,
        })
      );
  }, []);

  const lavenderStyle = 'bg-blue text-white flex justify-center p-8';
  const hasApply = item.apply.document[0].children[0].text !== '';

  return (
    <section className="relative mt-6 lg:mt-0">
      <div className={lavenderStyle}>
        <div className="lg:ml-10 w-full xl:w-8/12">
          <h1 className="text-4xl lg:text-7xl mb-7">{item.name}</h1>
          <DocumentRenderer
            document={item.intro.document}
            componentBlocks={Blocks(imageOverride)}
            renderers={Doc(rendererOverrides)}
          />
        </div>
      </div>
      {hasApply && (
        <div className="bg-gradient-to-r from-clay via-pink to-wind text-white p-5 lg:px-48">
          <div className="lg:ml-10 w-full xl:w-8/12">
            <h1 className="text-4xl lg:text-7xl font-normal mb-7 w-full text-right">
              How to Apply
            </h1>
            <DocumentRenderer
              document={item.apply.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
          </div>
        </div>
      )}
      <div
        className="bg-cover p-5 lg:px-48 text-white"
        style={{ backgroundImage: `url(${bgImg1})` }}
      >
        <h1 className="text-4xl lg:text-7xl font-normal mb-7 w-full">
          Past Recipients
        </h1>
        <div className="w-full">
          <DocumentRenderer
            document={item.pastRecipients.document}
            componentBlocks={Blocks(imageOverride)}
            renderers={Doc(rendererOverrides)}
          />
        </div>
      </div>
    </section>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = (await query(
    'awards',
    `awards {
            key
        }
        `
  )) as { key: string }[];

  const paths = items
    .filter(({ key }) => !!key)
    .map(({ key }) => `/awards/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await query(
    'awards',
    `awards(where: { key: { equals: "${params!.key}" } }) {
        name
        intro {
            document
        }
        apply {
            document
        }
        pastRecipients {
            document
        }
        bgImage1 {
            publicId
        }
    }`
  );
  const item = itemResult[0] as Award;
  return { props: { item } };
}
