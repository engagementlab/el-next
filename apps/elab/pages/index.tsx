import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div
        className={`flex min-h-screen flex-col items-center justify-between`}
      >
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
