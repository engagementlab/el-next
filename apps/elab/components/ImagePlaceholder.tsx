import Image, { ImageLoaderProps } from 'next/image';

type Props = {
  imageLabel: string;
  width: number;
  height: number;
};

const thumbLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return src;
};

export default function ImagePlaceholder({ imageLabel, width, height }: Props) {
  return (
    <Image
      src={`https://dummyimage.com/${width}x${height}/F6A536/fff.png&text=${imageLabel}+Image+Missing`}
      alt={`Preview image with text saying '${imageLabel} Image Missing'`}
      width={width}
      height={height}
      loader={thumbLoader}
      className="rounded-full"
    />
  );
}
