import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Image, {ImageUrl} from '@el-next/components/image';

import _ from 'lodash';
import ImageGallery from 'react-image-gallery';

import query from "../../../../apollo-client";

import { Blocks, Doc } from '../../components/Renderers';
import { useEffect, useState } from 'react';

type Award = {
    name: string;
    intro: any;
    apply: any;
    pastRecipients: any;
    bgImage1: {
        publicId: string;
    }
}

const imageOverride = (props: any) => {
  return (
      <Image id={'img-' + props.image.publicId} alt={props.image.alt} imgId={props.image.publicId} aspectDefault={true} className='max-w-[210px]' />
  );
};

export default function Award({ item }: InferGetStaticPropsType<typeof getStaticProps>) {

    const [bgImg1, setBgImg1] = useState('')
    
    useEffect(() => {
        if(item.bgImage1)
            setBgImg1(
                ImageUrl({
                    imgId: item.bgImage1.publicId,
                    width: window.innerWidth,
                    transforms: `f_auto,dpr_auto,c_thumb,g_face,ar_4:3,e_colorize:70,co_rgb:ffdb66,o_60,w_${window.innerWidth}`
                }))
    }, []);

    const lavenderStyle = 'bg-blue text-white flex justify-center p-8';

    return (
        <section className="relative mt-6 lg:mt-0">
            <div className={lavenderStyle}>
                <div className='lg:ml-10 w-full xl:w-8/12'>
                    <h1 className='text-2xl lg:text-7xl mb-7'>{item.name}</h1>
                    <DocumentRenderer document={item.intro.document} componentBlocks={Blocks(imageOverride)}
                        renderers={Doc()} />
                </div>
            </div>
            <div className='bg-cover' style={{backgroundImage: `url(${bgImg1})`}}>
                <div className='lg:ml-10 w-full xl:w-8/12'>
                    <h1 className='text-2xl lg:text-7xl font-semibold mb-7 w-full text-right'>How to Apply</h1>
                    <DocumentRenderer document={item.apply.document} componentBlocks={Blocks()}
                        renderers={Doc()} />
                </div>
            </div>
        </section>
    )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const items = await query(
        'awards',
        ` awards {
            key
        }
        `
    ) as { key: string }[];

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
    }`);
    const item = itemResult[0] as Award;
  return { props: { item } };
}