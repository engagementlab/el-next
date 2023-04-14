import React, { useEffect } from 'react';

function CMSRedirect() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `https://cms.elab.emerson.edu/sjm`;
    }, 2000);
  });

  return (
    <div className="flex justify-center items-center w-full h-full my-16 font-sans">
      <h1 className="text-5xl">Sending you to Engagement Lab CMS...</h1>
    </div>
  );
}

export default CMSRedirect;
