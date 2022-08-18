import {
    InferGetStaticPropsType
} from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from 'lodash';
import {
    motion
} from "framer-motion";

import query from "../../apollo-client";

import { Filtering } from "@el-next/components/filtering";
import { Image } from '@el-next/components/image';
import Layout from "../../components/Layout";
import ImagePlaceholder from "../../components/ImagePlaceholder";

type StudioItem = {
    name: string;
    key: string;
    blurb: string;
    filters: {key: string, name: string}[];
    thumbnail: {
        publicId: string;
    }
}

const renderItem = (props: {
        item: StudioItem, toggleFilter: (filter: string) => void 
    }) => {
        const btnClass = 'my-4 lg:my-0 inline-block rounded-full px-8 py-5 uppercase bg-lynx text-bluegreen border-2 border-bluegreen transition-all hover:bg-green-blue hover:text-lynx group-hover:bg-green-blue group-hover:text-lynx hover:border-green-blue group-hover:border-green-blue';
        return (
            <Link href={`/studios/${props.item.key}`} passHref>
                <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="ml-5 mb-32 cursor-pointer group">
                    {
                        props.item.thumbnail ?
                        <Image id={`thumb-${props.item.key}`} alt={`Thumbnail for studio with name "${props.item.name}"
                        `} imgId={props.item.thumbnail.publicId} lazy={true} className="w-full max-w-s" /> :
                        <ImagePlaceholder imageLabel='Studio' width={716} height={200} />
                    }
                    <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">{props.item.name}</h3>

                    <div className="flex flex-col lg:flex-row items-start justify-between">
                        <div className="w-full lg:w-2/3">
                            <p className="mt-2 mb-0" dangerouslySetInnerHTML={{__html: props.item.blurb.replace('Facilitated by', '<i>Facilitated by</i>')}}></p>
                        </div>
                        <button
                            className={btnClass}>
                            See Details</button>
                    </div>
                </motion.div>
            </Link>
    );
}

export default function Studios({ filtersGrouped, studios }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    const preSelectedFilters = Object.keys(router.query).length === 1 ? Object.keys(router.query)[0].split('/') as never[] : [];
    const filtering = new Filtering<StudioItem>(filtersGrouped, preSelectedFilters, studios, renderItem);

    return (
        <Layout>
            <div
            className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
                <h2 className="text-2xl text-bluegreen font-semibold mb-8">Studios at Emerson College</h2>

                <p className="w-full lg:w-1/2 mb-14">Students and faculty work alongside community partners to co-create narrative interventions to the crisis of gun violence as it is experienced locally. The <i>Transforming Narratives of Gun Violence Initiative</i> is a multi-year initiative and hosts 5-7 studios per year.</p>
                <filtering.FilteredItems />

            </div>
        </Layout>
    );
}

export async function getStaticProps() {

    const filters = await query(
        'filters', 
        `filters(where: {
            section: {
                equals: studio
            },
            enabled: {
                equals: true
            }
        }) { 
            key
            name
            type
        }`) as any[];

    // Group filters by type
    const filtersGrouped = filters.reduce((filterMemo, {key, type, name}) => {
        (filterMemo[type] = filterMemo[type] || []).push({
            key,
            name
        });
        return filterMemo;
        }, {});

    const studios = await query(
        'studios',
        `studios(
            where: {
                enabled: {
                    equals: true
                }
            },
            orderBy: {
                createdDate: asc
            }		
        ) {
            name blurb key filters { key name } thumbnail { publicId }
        }`) as StudioItem[];

    return {
      props: {
        filtersGrouped,
        studios,
      }
    };
  }
