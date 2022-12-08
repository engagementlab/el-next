import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import _ from 'lodash';

import Image from '@el-next/components/image';

import query from "../../../apollo-client";
import { Blocks, Doc } from '../components/Renderers';

type About = {
    name: string;
    intro: any;
    books: any;
    selectWritings: any;
}

const imageOverride = (props: any) => {
  return (
      <Image id={'img-' + props.image.publicId} alt={props.image.alt} imgId={props.image.publicId} aspectDefault={true} className='max-w-[150px]' />
  );
};

export default function About({ item }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <section className="relative mt-6 lg:mt-0">
                    <div className='flex justify-center bg-lavender text-white p-8'>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7'>{item.name}</h1>
                            <DocumentRenderer document={item.intro.document} componentBlocks={Blocks()}
                                renderers={Doc()} />
                        </div>
                    </div>
                    <div className='flex justify-center bg-gradient-to-r from-clay via-pink to-wind text-white p-8'>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h2 className='text-xl lg:text-6xl font-bold my-4 md:my-7'>Books</h2>
                            <DocumentRenderer document={item.books.document} componentBlocks={Blocks(imageOverride)} renderers={Doc()} />
                        </div>
                    </div>
                    <div className='flex justify-center bg-lavender text-white p-8'>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h2 className='text-xl lg:text-6xl font-bold my-4 md:my-7'>Select Writings</h2>
                            <DocumentRenderer document={item.selectWritings.document} componentBlocks={Blocks()}
                                renderers={Doc()} />
                        </div>
                    </div>
            </section>
        </>
    )
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const itemResult = await query(
    'abouts',
    `abouts {
        name
        intro {
            document
        }
        books {
            document
        }
        selectWritings {
            document
        }
    }`);
    const item = itemResult[0] as About;
    return { props: { item } };
}