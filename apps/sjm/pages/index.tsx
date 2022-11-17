import { useEffect, useState } from 'react';
import Image from '@el-next/components/image';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';

export default function Home() {
  return (
    <>
      <section className="relative mt-6">
        <div className="flex flex-col justify-center items-center w-full h-full absolute top-0 left-0 bg-black/50 text-white">
          <h1 className='text-2xl lg:text-7xl'>Social Justice + Media Symposium</h1>
          <h3 className='px-5 '>The Social Justice + Media Symposium is an annual gathering of students, faculty, and stakeholders to
            explore how media practices and pedagogies can support equity, justice, and positive social change in daily
            life.</h3>
        </div>
        <video playsInline autoPlay muted loop className='min-h-[20vh] bg-black/50'>
          <source
            src='https://res.cloudinary.com/engagement-lab-home/video/upload/ac_none,q_80,c_crop,f_auto,h_519,w_1905/v1668549678/sjm/intro.mp4'
            type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
       <ParallaxBanner
        layers={[
          {
            speed: -20,
            children: (
              <div className="absolute inset-0">
                <Image id="bg-1" alt="Social Justice and Media Symposium logo" imgId='sjm/bg-index-1'
                  width={2200} />
              </div>
            ),
          },
          // {
          //   speed: -80,
          //   // translateY: ['110%', '0'],
          //   children: (
          //     <div className="absolute inset-0">
          //       <Image id="bg-2" alt="" imgId='sjm/bg-index-2'
          //         width={2200} />
          //     </div>
          //   ),
          // },
        ]}
        className="aspect-[2/1]">

    </ParallaxBanner>
        <div className='bg-blossom p-20 '>
          <h2 className='text-3xl'>The Symposium</h2>
          <p className=''>Young storytellers today have power. As our digital ecosystems further polarize our politics and
            splinter our communities, those engaged in creating stories that support positive social change are
            motivated by purpose and presence. Around the world, young people are creating movements to support more
            just and equitable futures. These movements are anchored by narratives that reframe, uplift, and give
            power to those ideas and people on the margins. The Social Justice + Media Symposium was created to bring
            emerging storytellers together to build networks of support, mentorship and collaboration in support of
            equitable civic futures.




            SJ+M annually convenes students, faculty, activists, scholars, and storytellers to explore how media
            pedagogies and practices can support more just and equitable civic futures. The symposium provides space
            for emerging storytellers from universities around the world to create networks that advocate for the
            media and civic systems that best reflect equitable and vibrant societies. Each spring, SJ+M presents the
            transformative media literacy scholar award, which provides support for social justice media projects, and
            access to networks of fellow practitioners and teachers.



            The symposium is in memory of the work and life of Professor Moses Shumow. On October 22, 2019, mediamaker
            and activist Moses Shumow passed away tragically in a train accident outside of Boston, MA. Moses was a
            firm believer in the power of story to reframe narratives of the marginalized. He worked tirelessly in the
            classroom and community, to help people use media to advocate for their rights. His classrooms were
            reflections of this work, and his students gravitated towards his commitment, passion and energy. The
            symposium annually gathers students, faculty, activities, practitioners, and those committed to more
            equitable futures to continue the dialog that was so important to Moses’s work, and to communities around
            the world.</p>
        </div>
   <ParallaxBanner
      layers={[
        {
          speed: -20,
          children: (
            <div className="absolute inset-0">
              <Image id="bg-2" alt="Social Justice and Media Symposium logo" imgId='sjm/bg-index-2'
                width={2200} />
            </div>
          )
        },
        // {
        //   children: (

        //   )
        // }
      ]}
      className="aspect-[2/1]"
    >
      </ParallaxBanner>
      </> 
  )
}