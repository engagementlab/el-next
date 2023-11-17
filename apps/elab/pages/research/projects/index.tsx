import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Image, Query } from '@el-next/components';

import { ResearchProject, Theme } from '@/types';
import Layout from '../../../components/Layout';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import _ from 'lodash';

const ItemRenderer = (props: { item: ResearchProject }) => {
  const endLabel = props.item.ongoing
    ? '- Present'
    : props.item.endYear
    ? `- ${props.item.endYear}`
    : '';
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Link
        href={`/research/projects/${props.item.key}`}
        passHref
        className="group relative"
      >
        {props.item.pin && (
          <div className="absolute right-4 top-4 p-2 bg-white rounded-full group">
            <>
              <div className="relative">
                {/* <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all group-hover:scale-100 group-hover:translate-y-0">
                  <svg viewBox="3 6.317 45 24.354" width="45" height="24.354">
                    <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                    <path
                      d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                      style={{ fill: 'white' }}
                    ></path>
                  </svg>
                  <div className="absolute top-0 left-[5px] text-xs text-grey font-semibold">
                    Pinned
                  </div>
                </span> */}
                <svg height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    fill="#444"
                    d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"
                  />
                </svg>
              </div>
            </>
          </div>
        )}
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
        <h2 className="text-sm">
          {props.item.startYear}&nbsp;
          {endLabel}
        </h2>

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
				endYear: asc
			}
		) {
			name
			key
      pin
      ongoing
      startYear
      endYear
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
      researchProjects: _.sortBy(
        researchProjects as ResearchProject[],
        (project: ResearchProject) => {
          // Pinned projects always appear first
          if (project.pin) return -1;
          return project.ongoing ? 0 : 1;
        }
      ),
      blurb: blurb.researchProjectsBlurb,
    },
    revalidate: 1,
  };
}
