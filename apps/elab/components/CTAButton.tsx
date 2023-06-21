import * as React from 'react';
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
  theme?: Theme;
};

const CTAButton = ({ link, label, theme }: Props): JSX.Element => {
  let themeColor = '';
  let shadowColor = '227,191,255';
  if (theme === Theme.gunviolence) themeColor = 'purple';
  else if (theme === Theme.climate) themeColor = 'green-blue';
  let shadow = `drop-shadow-[3px_5px_0px_rgba(${shadowColor},1)] text-${themeColor} border-${themeColor} hover:bg-${themeColor} hover:drop-shadow-none`;

  let buttonClass = `inline-block px-3 py-3 border-2 transition-all duration-200 hover:text-white hover:scale-110 ${shadow} `;

  return (
    <Button
      label={label}
      link={link}
      icon={
        <svg
          className="h-4 w-6 inline-block group-hover:translate-x-1 group-hover:stroke-white group-hover:scale-150 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#8D33D2"
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
