import { InferGetStaticPropsType } from 'next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import { Button, HeadingStyle, Query, Image, Video } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../components/Layout';
import { Theme } from '@/types';
import { CTAButton } from '@/components/Buttons';
import Divider from '@/components/Divider';
import Slideshow from '@/components/Slideshow';

type AboutPage = {
  intro: string;
  slides: any[];
};

export default function GunViolence({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      fullBleed={true}
      theme={Theme.gunviolence}
      breadcrumbs={[
        { label: 'Social Impact Initiatives', href: '/initiatives' },
      ]}
    >
      <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
        <h2 className="text-5xl text-slate font-extrabold">
          Transforming Narratives of Gun Violence
        </h2>
        <Tabs>
          <TabList className="flex">
            <Tab selectedClassName="bg-[#F4E5FE]">Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
      <Divider color="bg-blue" />
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'initiative',
    `initiative(where: { name: "Gun Violence" }) {
        intro 
        slides {
          image {
            publicId
            publicUrl
          }
          altText
          videoId
        }
      }`
  );
  // console.log(result.slides[1].image);
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }

  const page = result as AboutPage;
  return {
    props: {
      page,
    },
  };
}
