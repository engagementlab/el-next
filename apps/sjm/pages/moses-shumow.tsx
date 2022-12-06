import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Image, {ImageUrl} from '@el-next/components/image';

import _ from 'lodash';

import query from "../../../apollo-client";

import { Blocks, Doc } from '../components/Renderers';

type About = {
    name: string;
    intro: any;
    books: any;
    selectWritings: any;
}

export default function About({ item }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <section className="relative mt-6 lg:mt-0">
                    <div className='bg-lavender text-white flex justify-center p-8'>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7'>{item.name}</h1>
                            <DocumentRenderer document={item.intro.document} componentBlocks={Blocks()}
                                renderers={Doc()} />
                        </div>
                    </div>
                    {/* <div className='bg-cover' style={{backgroundImage: `url(${bgImg1})`}}>
                        <div className='lg:ml-10 w-full xl:w-8/12'>
                            <h1 className='text-2xl lg:text-7xl font-semibold mb-7 w-full text-right'>Agenda</h1>
                            <DocumentRenderer document={item.agenda.document} componentBlocks={Blocks()}
                                renderers={Doc(agendaRendererOverrides)} />
                        </div>
                    </div> */}
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