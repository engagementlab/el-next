import * as React from 'react';
import clsx from 'clsx';
import { Theme } from '@/types';
import { Button } from '@el-next/components';

type Props = {
  /**
   * The button's HREF attribute
   */
  link: string;
  /**
   * The button's label
   */
  label: string;
  theme: Theme;
};

const CTAButton = ({ link, label, theme }: Props): JSX.Element => {
  const themeConfig = [
    {},
    {
      arrow: '#7C4E9F',
      hover:
        'purple text-purple border-purple drop-shadow-purple hover:bg-[#E3BFFF] hover:drop-shadow-[3px_5px_0px_#7C4E9F]',
    },
    {
      arrow: '#00A494',
      hover:
        'green-blue text-green-blue border-green-blue drop-shadow-green-blue hover:bg-[#BBEBE7] hover:drop-shadow-[3px_5px_0px_#00A494]',
    },
  ];

  const buttonClass = clsx(
    'inline-block px-3 py-3 border-2 bg-white transition-all duration-200',
    themeConfig[theme].hover
  );

  return (
    <Button
      label={label}
      link={link}
      icon={
        <svg
          className="h-4 w-6 inline-block group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke={themeConfig[theme].arrow}
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      }
      classOverride={buttonClass}
    />
  );
};

export default CTAButton;
