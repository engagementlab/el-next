import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout title="Not Found">
      <div className="flex flex-row justify-center min-h-screen w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="128"
          viewBox="0 -960 960 960"
          width="128"
        >
          <path d="M250-320h60v-10q0-71 49.5-120.5T480-500q71 0 120.5 49.5T650-330v10h60v-10q0-96-67-163t-163-67q-96 0-163 67t-67 163v10Zm34-270q41-6 86.5-32t72.5-59l-46-38q-20 24-55.5 44T276-650l8 60Zm392 0 8-60q-30-5-65.5-25T563-719l-46 38q27 33 72.5 59t86.5 32ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z" />
        </svg>
        <div>
          <h1 className="text-5xl text-red font-semibold">Not Found.</h1>
          <p>Sorry, but the page you're looking for could not be found.</p>
        </div>
      </div>
    </Layout>
  );
}
