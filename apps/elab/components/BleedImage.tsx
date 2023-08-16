import { Image } from '@el-next/components';
import * as React from 'react';

type Props = {
  /**
   * The image's alt text
   */
  alt: string;
  /**
   * The image's ID attribute
   */
  id: string;
  /**
   * The image's cloud public id attribute
   */
  imgId: string;
  /**
   * The image element's optional class
   */
  className?: string;
  /**
   * The image's optional cloud transformations
   * @defaultValue "f_auto,dpr_auto,ar_4:3,c_crop,g_center"
   * - 'c_crop,g_center' are omitted if maxWidth defined
   */
  transforms?: string;
  /**
   * The image's optional width
   */
  width?: number;

  isSlide?: boolean;
};
const BleedImage = ({
  alt,
  id,
  imgId,
  transforms,
  width,
  className,
  isSlide,
}: Props): JSX.Element => {
  return (
    <div className="overflow-x-hidden sm:overflow-x-visible">
      <div className="relative w-[105%] max-w-max">
        <Image
          id={id}
          alt={alt}
          imgId={imgId}
          width={width}
          maxWidthDisable={true}
          transforms={transforms}
          className={`relative md:w-full -left-3 sm:max-w-xs xl:max-w-full sm:left-[5%] md:left-0 ${className}`}
        />
      </div>
    </div>
  );
};

export default BleedImage;
