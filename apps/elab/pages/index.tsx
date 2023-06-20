import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout
      topBgElement={
        <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-red/[.2] via-green-blue/[.2] to-yellow/[.5] s  md:mx-16"></div>
      }
    >
      <div
        className={`flex min-h-screen flex-col items-center justify-between`}
      >
        <motion.div
          className="px-10 p-3 w-48 h-48 
         text-xl bg-green-blue group relative"
          whileHover={{
            scale: 1.1,
            boxShadow: '2px 2px 100px 2px rgba(0, 0, 0, 0.15)',
          }}
          whileTap={{ scale: 0.8 }}
        >
          <div className="absolute group-hover:hidden">Hover / Tap</div>
          <div className="absolute hidden group-hover:block w-full h-full top-0 left-0">
            <img src="https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,q_auto:eco,w_250/v1685130208/elab-home-3.x/Peace_in_Process__May_2_2023-high.gif" />
          </div>
        </motion.div>
        <h1 className="">Donec sodales</h1>
        <h3 className="">
          Cras ultricies mi eu turpis hendrerit fringilla. Nam quam nunc,
          blandit vel, luctus pulvinar, hendrerit id, lorem. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          hymenaeos. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
          semper libero, sit amet adipiscing sem neque sed ipsum. Integer
          tincidunt. Fusce egestas elit eget lorem.
        </h3>
      </div>
    </Layout>
  );
}
