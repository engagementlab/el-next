import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Image, Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import { Blocks, Doc } from '../../../components/Renderers';

import { ResearchProject, Theme, Theming } from '@/types';
import Divider from '@/components/Divider';
import { CTAButton } from '@/components/Buttons';
import { PeopleList } from '@/components/People';
import { Gutter } from '@/components/Gutter';

export default function ResearchProject({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const endLabel = item?.ongoing
    ? '- Present'
    : item?.endYear
    ? `- ${item?.endYear}`
    : '';
  return (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Research Projects', href: '/research/projects' }]}
      fullBleed={true}
      title={`${item?.name} - Research Projects`}
    >
      {item && (
        <div className="text-grey">
          <Gutter>
            <h1 className="font-extrabold text-6xl text-slate">{item.name}</h1>
            <h2>
              {item.startYear}&nbsp;
              {endLabel}
            </h2>
            <div className="flex flex-col-reverse xl:flex-row gap-x-5 mt-16">
              <div className="w-full xl:w-1/2 xl:basis-1/2 flex-shrink-0">
                <Image
                  id="thumb"
                  alt={item.thumbAltText}
                  imgId={item.thumbnail.publicId}
                  // width={480}
                  maxWidth={800}
                />
              </div>

              <div className="flex flex-col items-center">
                <div className="my-6">
                  <DocumentRenderer document={item.headingText.document} />
                </div>
                {item.buttons &&
                  item.buttons.length > 0 &&
                  item.buttons.map((button) => (
                    <CTAButton
                      label={button.label}
                      link={button.url}
                      external={true}
                      icon={button.icon}
                      theme={Theme.none}
                      className={`flex flex-row-reverse gap-x-3 items-center text-3xl font-semibold mb-8`}
                    />
                  ))}
              </div>
            </div>
          </Gutter>
          <Divider />
          <Gutter>
            <div id="content">
              <h2 className="font-bold text-5xl my-3">About the Project</h2>
              <DocumentRenderer
                document={item.content.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </div>
            {item.collaborators && item.collaborators.length > 0 && (
              <>
                <h3
                  className={`text-xl font-extrabold uppercase mt-10 mb-4 ${Theming['none'].heading}`}
                >
                  Collaborators
                </h3>
                <div className="lg:ml-5 grid sm:grid-cols-2 xl:grid-cols-4 gap-y-5 md:gap-x-10 lg:gap-2 xl:gap-y-2 justify-center justify-items-center">
                  {item.collaborators.length > 0 &&
                    item.collaborators.map((collaborator) => (
                      <Image
                        id={`collaborators-${collaborator.key}`}
                        alt={`Logo image for ${collaborator.name}`}
                        imgId={collaborator.logo.publicId}
                        width={150}
                      />
                    ))}
                </div>
              </>
            )}
            {item.funders && item.funders.length > 0 && (
              <>
                <h3
                  className={`hidden lg:block text-xl font-extrabold uppercase mt-10 mb-4 ${Theming['none'].heading}`}
                >
                  Funders
                </h3>
                <div className="lg:ml-5 grid sm:grid-cols-2 xl:grid-cols-4 gap-y-5 md:gap-x-10 lg:gap-2 xl:gap-y-2 justify-center justify-items-center">
                  {item.funders.length > 0 &&
                    item.funders.map((funder) => (
                      <Image
                        id={`funders-${funder.key}`}
                        alt={`Logo image for ${funder.name}`}
                        imgId={funder.logo.publicId}
                        width={150}
                      />
                    ))}
                </div>
              </>
            )}
            {item.projectLeads && item.projectLeads.length > 0 && (
              <PeopleList
                list={item.projectLeads}
                heading="Project Leads"
                theme={Theming['none']}
                index={3}
              />
            )}
            {item.projectTeam.document.length > 2 && (
              <>
                <h2
                  className={`text-xl font-extrabold uppercase my-3 4 ${Theming['none'].heading}`}
                >
                  Project Team
                </h2>
                <DocumentRenderer document={item.projectTeam.document} />
              </>
            )}
            {item.contact && item.contact.length > 0 && (
              <>
                <h2
                  className={`text-xl font-extrabold uppercase my-3 4 ${Theming['none'].heading}`}
                >
                  Project Contact
                </h2>
                <p className="w-full">
                  For inquiries about this project, please contact&nbsp;
                  {item.contact}.
                </p>
              </>
            )}
          </Gutter>
        </div>
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
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'researchProjects',
    `researchProjects(where: { key: { equals: "${params!.key}" } }) {
        name
        ongoing
        startYear
        endYear
        headingText {
          document
        }
        thumbnail {
          publicId
        }
        thumbAltText
        buttons
        content {
           document(hydrateRelationships: true)
        }
        projectLeads {
          name
          key
          title
          secondaryTitle
          image {
              publicId
          }
        }
        projectTeam {
          document
        }
        shortDescription
        contact
        collaborators {
          name
          key
          url
          logo {
              publicId
          }
        }
        funders {
          name
          key
          url
          logo {
              publicId
          }
        }
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
  const item = itemResult[0] as ResearchProject;
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
  // console.log(item.projectTeam.document);
  return { props: { item }, revalidate: 1 };
}
