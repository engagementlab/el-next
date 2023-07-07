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
    <div className="relative overflow-x-hidden">
      <img
        className={`relative rounded-full md:w-full  -left-[5%] sm:max-w-sm xl:max-w-full sm:left-[5%] md:left-0`}
        src="https://placehold.co/812x812?text=Image Here"
      />

      <aside
        className={`absolute bottom-0 right-0 p-3 w-3/4 bg-${themeColor} text-white`}
      >
        ↳ {caption}
      </aside>
    </div>
  );
};

export default CaptionedImage;
