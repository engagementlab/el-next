import {
    InferGetStaticPropsType
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import _ from 'lodash';
import { motion } from "framer-motion";

import query from "../../../..//apollo-client";

import Filtering from "../../components/filtering";
import Image from '@el-next/components/image';

import Layout from "../../components/Layout";
import ImagePlaceholder from "../../components/ImagePlaceholder";

type MediaItem = {
        title: string;
        key: string;
        shortDescription: string;
        filters: {key: string, name: string}[];
        thumbnail: {
            publicId: string;
        }
}

const renderItem = (props: { item: MediaItem, toggleFilter: (filter: string) => void }) => {
    return (
        <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="w-full">
            <Link href={`/archive/${props.item.key}`} passHref>
                <a className='group'>
                    {
                        props.item.thumbnail ?
                        <Image id={`thumb-${props.item.key}`} alt={`Thumbnail for media with name "${props.item.title}"
                            `} imgId={props.item.thumbnail.publicId} lazy={true} className="w-full" /> :
                        <ImagePlaceholder imageLabel='Media' width={335} height={200} />
                    }
                    <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">{props.item.title}</h3>
                </a>
            </Link>
            <div className="mt-2 mb-20">
                <p className="m-0">{props.item.shortDescription}</p>
            </div>
        </motion.div>
    );
}

export default function MediaArchive({ filtersGrouped, mediaItems }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    const preSelectedFilters = Object.keys(router.query).length === 1 ? Object.keys(router.query)[0].split('/') as never[] : [];
    const filtering = new Filtering<MediaItem>(filtersGrouped, preSelectedFilters, mediaItems, renderItem, 'media');
    return (
        <Layout>
            <div
            className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
                <h2 className="text-2xl text-bluegreen font-semibold mb-8">Media Archive</h2>

                <p className="w-full lg:w-1/2 mb-14">This expanding collection of media artifacts represents the outcomes of studio courses at Emerson College. Everything in this collection was created to be used by communities and organizations for the purpose of advocacy or activism. We ask, if you use the content, that you please give appropriate credit to TNGV and/or the individual creators.</p>
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
                equals: media
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
    const filtersGrouped = filters.reduce((filterMemo, {
        type,
        key,
        name
    }) => {
        (filterMemo[type] = filterMemo[type] || []).push({
            key,
            name
        });
        return filterMemo;
    }, {});
	
	const mediaItems = await query(
		'mediaItems',
		`mediaItems(
			where: {
				enabled: {
					equals: true
				}
			},
			orderBy: {
				createdDate: desc
			}		
		) {
			title
			key
			shortDescription 
			filters {
				key
				name
			}
			thumbnail { 
				publicId
			}
		}`) as MediaItem[];

	return {
		props: {
			filtersGrouped,
			mediaItems,
		}
	};

}
