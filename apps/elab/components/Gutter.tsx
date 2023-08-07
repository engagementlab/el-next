import { ReactNode } from 'react';

export const Gutter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:px-20 xl:px-24 my-6 xl:my-12 mt-14 mb-24 xl:mt-16 px-5 w-full">
      {children}
    </div>
  );
};
