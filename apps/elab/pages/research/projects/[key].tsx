import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, Image, Query, Video } from '@el-next/components';

import _ from 'lodash';
import { create } from 'zustand';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

import Layout from '../../../components/Layout';
import { Blocks, Doc } from '../../../components/Renderers';
import { CTAButton } from '@/components/Buttons';
import { Partner, Theme } from '@/types';
import { subscribeWithSelector } from 'zustand/middleware';
import Logos from '@/components/Logos';
import { useEffect } from 'react';
import Divider from '@/components/Divider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type Studio = {
  name: string;
  type: string;
  partners: string[];
  content: {
    document: any;
  };
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbnailAltText: string;
};

export default function Studio({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Research Projects', href: '/research/projects' }]}
    >
      {item && (
        <>
          <h1>{item.name}</h1>

          <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-3/4 lg:w-full mt-6">
              <p className="text-yellow text-xl lg:text-3xl font-extrabold uppercase">
                Jump to:
              </p>
              <Button
                label="About the Project"
                anchorId="content"
                className="border-red text-red fill-yellow text-sm"
              />
              {/*
                <Button
                  label="Impact Beyond the Studio"
                  anchorId="impact"
                  className="border-green-blue text-green-blue fill-green-blue"
                />
                <Button
                  label="Studio Participants"
                  anchorId="impact"
                  className="border-green-blue text-green-blue fill-green-blue"
                /> */}
            </div>
            <div id="content">
              <h2>About the Project</h2>
              <DocumentRenderer
                document={item.content.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </div>

            <Divider />
            {/* <div className="flex flex-wrap my-4">
                {selectedSemester.learningPartners.map((person) => (
                  <div
                    className="flex flex-col w-1/5 ml-3"
                    key={`thumb-${person.key}`}
                  >
                    <Image
                      id={`thumb-${person.key}`}
                      alt={`Photo of ${person.name}`}
                      imgId={person.image.publicId}
                      width={230}
                      // aspectDefault={true}
                      transforms="f_auto,dpr_auto,c_fill,g_face,r_max,h_230,w_230"
                      className="rounded-full border-4 border-purple"
                    />
                    <p>{person.name}</p>
                    <p>{person.title}</p>
                  </div>
                ))}
              </div> */}
          </motion.div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'researchProjects',
    `researchProjects {
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
    .map(({ key }) => `/research/projects/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'researchProjects',
    `researchProjects(where: { key: { equals: "${params!.key}" } }) {
        name
        content {
            document
        }
        shortDescription
        thumbnail {
            publicId
        }
        thumbAltText
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
  const item = itemResult[0] as Studio;
  // const relatedItems = (await query.MediaItem.findMany({
  //     where: {
  //         filters: {
  //             some:{
  //                 OR: [
  //                     { name: { equals: "2022" } },
  //                     { name: { equals: "Rural Voices" } }
  //                 ]
  //             }
  //         }
  //     },
  //     query: 'title key filters { key name } shortDescription thumbnail { publicId }',
  // })) as MediaItem[];
  return { props: { item } };
}