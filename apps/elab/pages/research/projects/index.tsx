import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Image, Query } from '@el-next/components';

import { ResearchProject, Theme } from '@/types';
import Layout from '../../../components/Layout';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const ItemRenderer = (props: { item: ResearchProject }) => {
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
            transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
            imgId={props.item.thumbnail.publicId}
            width={460}
            maxWidthDisable={true}
            className="w-full"
          />
        ) : (
          <ImagePlaceholder imageLabel="Project" width={335} height={200} />
        )}
        <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">
          {props.item.name}
        </h3>
        <h2 className="text-sm">{props.item.years}</h2>

        <p>{props.item.shortDescription}</p>
      </Link>
    </motion.div>
  );
};

export default function MediaArchive({
  blurb,
  researchProjects,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} theme={Theme.none}>
      <div className="flex flex-col">
        <h1 className="m-6 font-extrabold text-4xl xl:text-6xl">
          Research Projects
        </h1>
        {blurb && (
          <div className="mx-6 w-full">
            <DocumentRenderer document={blurb.document} />
          </div>
        )}
        <div className="w-full mt-7">
          <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-8 lg:grid-cols-2 lg:gap-2 lg:my-11">
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
      years
			key
			shortDescription 
			thumbnail { 
				publicId
			}
      thumbAltText
		}`
  );
  const blurb = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Blurbs / Landing Pages" }) {
        researchProjectsBlurb {
          document
        }
      }`
  );

  if (researchProjects.error) {
    return {
      props: {
        error: researchProjects.error,
        researchProjects: null,
        blurb: null,
      },
    };
  }

  if (blurb.error) {
    return {
      props: {
        error: blurb.error,
        blurb: null,
        researchProjects: null,
      },
    };
  }
  return {
    props: {
      researchProjects: researchProjects as ResearchProject[],
      blurb: blurb.researchProjectsBlurb,
    },
    revalidate: 1,
  };
}
