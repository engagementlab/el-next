import { InferGetStaticPropsType } from 'next';
import _ from 'lodash';
import { motion } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Query } from '@el-next/components';

import { DefaultWhereCondition, ResearchProject, Theme } from '@/types';
import Layout from '../../../components/Layout';
import { ResearchProjectItemRenderer } from '@/components/Renderers';

export default function ResearchProjects({
  blurb,
  researchProjects,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} theme={Theme.none} title="Research Projects">
      <div className="flex flex-col">
        <h1 className="m-6 font-extrabold text-4xl xl:text-6xl">
          Research Projects
        </h1>
        <div className="container mb-24 px-4 xl:px-8">
          {blurb && (
            <div className="w-full">
              <DocumentRenderer document={blurb.document} />
            </div>
          )}
          <div className="mt-14 lg:ml-5 grid xl:grid-cols-3 gap-4 xl:gap-8 lg:grid-cols-2 lg:gap-2 lg:my-11">
            {researchProjects?.map((item, i: number) => (
              <ResearchProjectItemRenderer
                key={`research-project-${item.key}`}
                item={item}
                pin={item.pin}
                showYear={true}
                showBorder={
                  item.initiativesRelated && item.initiativesRelated.length > 0
                }
              />
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
			${DefaultWhereCondition()},
			orderBy: {
				endYear: desc
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
      initiativesRelated {
        name
      }
		}`
  );
  const blurb = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Miscellaneous Blurbs" }) {
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
