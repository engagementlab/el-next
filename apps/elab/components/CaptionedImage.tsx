import * as React from 'react';
import { Theme } from '@/types';
import { Button } from '@el-next/components';

type Props = {
  alt: string;
  caption: string;
  themeColor: string;
  imgId?: string;
  isSlide?: boolean;
};
const CaptionedImage = ({
  alt,
  caption,
  themeColor,
  imgId,
  isSlide,
}: Props): JSX.Element => {
  return (
    <div className="overflow-x-hidden sm:overflow-x-visible">
      <div className="relative w-[105%]">
        <img
          className={`relative rounded-full md:w-full -left-3 sm:max-w-xs xl:max-w-full sm:left-[5%] md:left-0`}
          src="https://placehold.co/812x812?text=Image Here"
        />

        <aside
          className={`absolute bottom-0 right-3 p-3 w-3/4 bg-${themeColor} text-white sm:max-w-xs sm:right-20 lg:right-0`}
        >
          ↳ {caption}
        </aside>
      </div>
    </div>
  );
};

export default CaptionedImage;
