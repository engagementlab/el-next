import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { create, Mutate, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';

import { Image, Filtering, Query } from '@el-next/components';

import { Theme } from '@/types';
import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import ImagePlaceholder from '@/components/ImagePlaceholder';

// import ImagePlaceholder from '../../components/';

interface ItemRendererProps<T> {
  item: T;
  toggleFilter: (filter: string) => void;
}
interface FilterState {
  currentTheme: Theme;
  currentFilters: never[];
  filterGroupOpen: string;
  toggle: (filter: any) => void;
  toggleFilterGroupOpen: (groupKey: string) => void;
  reset: () => void;
}

type MediaItem = {
  name: string;
  key: string;
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
};

const ItemRenderer = (props: { item: MediaItem }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Link
        href={`/research/projects/${props.item.key}`}
        passHref
        className="group"
      >
        {props.item.thumbnail ? (
          <Image
            id={`thumb-${props.item.key}`}
            alt={props.item.thumbAltText}
            imgId={props.item.thumbnail.publicId}
            maxWidth={800}
            className="w-full"
          />
        ) : (
          <ImagePlaceholder imageLabel="Project" width={335} height={200} />
        )}
        <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">
          {props.item.name}
        </h3>
        <p>{props.item.shortDescription}</p>
      </Link>
    </motion.div>
  );
};

export default function MediaArchive({
  researchProjects,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} theme={Theme.none}>
      <div className="flex flex-col">
        <div className="w-full">
          <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-3 lg:grid-cols-2 lg:gap-2">
            {researchProjects?.map((item, i: number) => (
              <ItemRenderer key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const researchProjects = await Query(
    'researchProjects',
    `researchProjects(
			where: {
				enabled: {
					equals: true
				}
			},
			orderBy: {
				createdDate: desc
			}		
		) {
			name
			key
			shortDescription 
			thumbnail { 
				publicId
			}
            thumbAltText
		}`
  );

  if (researchProjects.error) {
    return {
      props: {
        error: researchProjects.error,
        researchProjects: null,
      },
    };
  }

  return {
    props: {
      researchProjects: researchProjects as MediaItem[],
    },
  };
}
