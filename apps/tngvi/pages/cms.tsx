import React, { useEffect } from 'react';
import Layout from '../components/Layout';

function CMSRedirect() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `https://cms.elab.emerson.edu/tngvi`;
    }, 2000);
  });

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full my-16 font-sans">
        <h1 className="text-5xl">Sending you to Engagement Lab CMS...</h1>
      </div>
    </Layout>
  );
}

export default CMSRedirect;
