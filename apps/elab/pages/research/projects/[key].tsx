import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, Image, Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import { Blocks, Doc } from '../../../components/Renderers';
import { ResearchProject, Theme, Theming } from '@/types';
import Divider from '@/components/Divider';
import { CTAButton } from '@/components/Buttons';
import { PeopleList } from '@/components/People';

export default function ResearchProject({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Research Projects', href: '/research/projects' }]}
    >
      {item && (
        <div className="text-grey">
          <h1 className="font-extrabold text-6xl text-slate">{item.name}</h1>
          <div className="flex flex-col-reverse lg:flex-row gap-x-5 mt-16">
            <div className="w-full lg:w-1/2 lg:basis-1/2 flex-shrink-0">
              <Image
                id="thumb"
                alt={item.thumbnailAltText}
                imgId={item.thumbnail.publicId}
                transforms="f_auto,dpr_auto,c_fill,g_faces,w_450"
              />
            </div>

            <div className="flex flex-col items-center">
              <div className="my-6">
                <DocumentRenderer
                  document={item.headingText.document}
                  // componentBlocks={Blocks(theming)}
                  // renderers={Doc(rendererOverrides)}
                />
              </div>
              {item.buttons &&
                item.buttons.length > 0 &&
                item.buttons.map((button) => (
                  <CTAButton
                    label={button.label}
                    link={button.url}
                    icon={button.icon}
                    theme={Theme.none}
                    className={`flex flex-row-reverse gap-x-3 items-center text-3xl font-semibold mb-8`}
                  />
                ))}
            </div>
          </div>
          <div>
            <div className="hidden lg:block w-3/4 lg:w-full">
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
              <h2 className="font-bold text-5xl my-3">About the Project</h2>
              <DocumentRenderer
                document={item.content.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </div>{' '}
            <h3
              className={`hidden lg:block text-xl font-extrabold uppercase mt-10 mb-4 ${Theming['none'].heading}`}
            >
              Partners
            </h3>
            <div className="hidden flex-wrap my-4 gap-x-14 gap-y-5 lg:flex">
              {item.partners &&
                item.partners.length > 0 &&
                item.partners.map((partner) => (
                  <Image
                    id={`partners-${partner.key}`}
                    alt={`Logo image for ${partner.name}`}
                    imgId={partner.logo.publicId}
                    width={150}
                  />
                ))}
            </div>
            {item.projectLeads && item.projectLeads.length > 0 && (
              <PeopleList
                list={item.projectLeads}
                heading="Project Leads"
                theme={Theming['none']}
                index={3}
              />
            )}{' '}
            <h2
              className={`text-xl font-extrabold uppercase my-3 4 ${Theming['none'].heading}`}
            >
              Project Contact
            </h2>
            <p className="w-full">
              For inquiries about this project, please contact&nbsp;
              {item.contact}.
            </p>
          </div>
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
        headingText {
            document
        }
        thumbnail {
            publicId
        }
        thumbAltText
        buttons
        content {
            document
        }
        projectLeads {
          name
          key
          title
          image {
              publicId
          }
        }
        shortDescription
        contact
        partners {
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
  return { props: { item }, revalidate: 1 };
}
