import * as React from 'react';
import { Theme } from '@/types';
import { Button, Image } from '@el-next/components';

type Props = {
  alt: string;
  caption?: string;
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
    <div className="max-w-full">
      <div className="overflow-x-hidden sm:overflow-x-visible">
        <div className="relative w-[105%] max-w-[105%]">
          {!imgId ? (
            <img
              className={`relative md:w-full -left-3 sm:max-w-xs xl:max-w-full sm:left-[5%] md:left-0`}
              src="https://placehold.co/812x812?text=Needs Image Here"
            />
          ) : (
            <Image
              id={`captioned-image-${imgId}`}
              alt={alt}
              imgId={imgId}
              transforms="f_auto,dpr_auto,c_fill,g_faces,h_290,w_460"
              className="relative md:w-full -left-3 sm:max-w-xs xl:max-w-full sm:left-[5%] md:left-0"
            />
          )}
          {caption && (
            <aside
              className={`absolute bottom-0 right-3 p-3 w-3/4 ${themeColor} text-white sm:max-w-xs sm:right-20 lg:right-0`}
            >
              ↳ {caption}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptionedImage;
