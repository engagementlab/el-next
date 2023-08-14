import { ReactNode } from 'react';

export const Gutter = ({
  children,
  noMarginY = true,
}: {
  children: ReactNode;
  noMarginY?: boolean;
}) => {
  return (
    <div
      className={`md:px-20 xl:px-24px-5 w-full ${
        noMarginY ? 'my-0' : 'my-6 xl:my-12 mt-14 xl:mt-16 mb-24'
      }`}
    >
      {children}
    </div>
  );
};
