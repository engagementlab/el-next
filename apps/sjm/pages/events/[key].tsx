import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Image, {ImageUrl} from '@el-next/components/image';

import _ from 'lodash';
import ImageGallery from 'react-image-gallery';

import query from "../../../../apollo-client";

import { Blocks, Doc } from '../../components/Renderers';
import { useEffect, useState } from 'react';

type Event = {
    name: string;
    intro: any;
    agenda: any;
    awards: any;
    location: any;
    gallerySlides: {
        image: {
            publicId: string;
        }
        altText: string;
        caption: string;
    }[] 
    bgImage1: {
        publicId: string;
    }
    bgImage2: {
        publicId: string;
    }
}
const agendaRendererOverrides = {
  layout: (layout: any, children: any) => {
    const flexClass = 'flex gap-y-5 flex-col mt-10 xl:flex-row justify-between';
    if(layout[0] === 1 && layout[1] === 2) {
        return (
            <div
                className={flexClass}
            >
            {children.map((element: any, i: number) => (
                <div key={i} className='w-full xl:w-1/2'>{element}</div>
            ))}
            </div>
        );
    }

  }
};
const renderItem = (item: any) => {
    return <>
            <Image id={`img-${item.original}`} imgId={item.original} alt={item.altText} />
           </>;
};
const renderThumb = (item: any) => {
    return <>
            <Image id={`img-thumb-${item.original}`} imgId={item.thumbnail} alt={`Thumbnail for ${item.altText}`} />
           </>;
};
export default function Event({ item }: InferGetStaticPropsType<typeof getStaticProps>) {

    const [bgImg1, setBgImg1] = useState('')
    const [bgImg2, setBgImg2] = useState('')
    
    useEffect(() => {
        if(item.bgImage1)
            setBgImg1(
                ImageUrl({
                    imgId: item.bgImage1.publicId,
                    width: window.innerWidth,
                    transforms: `f_auto,dpr_auto,c_thumb,g_face,ar_4:3,e_colorize:70,co_rgb:ffdb66,o_60,w_${window.innerWidth}`
                }))
        if(item.bgImage2)
            setBgImg2(
                ImageUrl({
                    imgId: item.bgImage2.publicId,
                    width: window.innerWidth,
                    transforms: `f_auto,dpr_auto,c_thumb,g_face,ar_4:3,e_colorize:70,co_rgb:ffdb66,o_60,w_${window.innerWidth}`
                }))
    }, []);

    const lavenderStyle = 'bg-lavender text-white flex justify-center p-8';

    const images = _.map(item.gallerySlides, (imgItem) => {
        return {
            original: imgItem.image.publicId,
            thumbnail: imgItem.image.publicId,
            altText: imgItem.altText
        }
    });

    return (
        <>
            <section className="relative mt-6 lg:mt-0">
                    <div className={lavenderStyle}>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7'>{item.name}</h1>
                            <DocumentRenderer document={item.intro.document} componentBlocks={Blocks()}
                                renderers={Doc()} />
                        </div>
                    </div>
                    <div className='bg-cover' style={{backgroundImage: `url(${bgImg1})`}}>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7 w-full text-right'>Agenda</h1>
                            <DocumentRenderer document={item.agenda.document} componentBlocks={Blocks()}
                                renderers={Doc(agendaRendererOverrides)} />
                        </div>
                    </div>
                    <div className={lavenderStyle}>
                        <div className='lg:ml-10 w-full xl:w-8/12'>

                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7'>Awards</h1>
                            <DocumentRenderer document={item.awards.document} componentBlocks={Blocks()}
                                renderers={Doc()} />
                        </div>
                    </div>
                    <div className='bg-cover' style={{backgroundImage: `url(${bgImg2})`}}>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7 w-full text-right'>Location</h1>
                            <DocumentRenderer document={item.location.document} componentBlocks={Blocks()}
                                renderers={Doc()} />
                        </div>
                    </div>
                    <div className={lavenderStyle}>
                        <div className='lg:ml-10 w-full xl:w-8/12'>

                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7'>Galllery</h1>
                            <ImageGallery items={images} renderItem={renderItem} renderThumbInner={renderThumb}
                                showPlayButton={false} />
                        </div>
                    </div>
            </section>
        </>
    )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const items = await query(
        'events',
        ` events {
            key
        }
        `
    ) as { key: string }[];

    const paths = items
    .filter(({ key }) => !!key)
    .map(({ key }) => `/events/${key}`);

    return {
    paths,
    fallback: false,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const itemResult = await query(
    'events',
    `events(where: { key: { equals: "${params!.key}" } }) {
        name
        intro {
            document
        }
        agenda {
            document
        }
        awards {
            document
        }
        location {
            document
        }
        gallerySlides{
            image {
                publicId
            }
            altText
            caption
        }
        bgImage1 {
            publicId
        }
        bgImage2 {
            publicId
        }
    }`);
    const item = itemResult[0] as Event;
  return { props: { item } };
}