import * as React from 'react';
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
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className="mx-1 overflow-x-hidden sm:overflow-x-visible">
      <div className="relative">
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
            width={460}
            maxWidthDisable={true}
            className="relative md:w-full sm:max-w-xs xl:max-w-full sm:left-[5%] md:left-0"
            loaded={() => setLoaded(true)}
          />
        )}

        {caption && loaded && (
          <aside
            className={`absolute bottom-0 right-3 p-3 w-3/4 ${themeColor} text-white sm:max-w-xs sm:right-20 lg:right-0`}
          >
            ↳ {caption}
          </aside>
        )}
      </div>
    </div>
  );
};

export default CaptionedImage;
