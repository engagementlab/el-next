import { BlockRenderers, DocRenderers, Image } from '@el-next/components';
import { CTAButton } from './Buttons';
import { Theme } from '@/types';
import CaptionedImage from './CaptionedImage';
const blockOverrides = {
  buttonOverride: (props: { label: string }) => {
    return (
      <div className="mx-6 my-6">
        <CTAButton link="/" label={props.label} theme={Theme.none} />;
      </div>
    );
  },
  imageOverride: (props: any) => {
    const publicId = props.image.publicId || props.image.image.publicId;
    const alt = props.image.alt || props.image.image?.alt;

    return props.caption ? (
      <CaptionedImage
        imgId={publicId}
        caption={props.caption}
        alt={alt}
        themeColor="bg-teal"
      />
    ) : (
      <Image
        id={'img-' + publicId}
        alt={alt || ''}
        imgId={publicId}
        aspectDefault={true}
      />
    );
  },
};
const SuperBlocks = BlockRenderers();
const Blocks = () => {
  return SuperBlocks(blockOverrides);
};

const Doc: any = DocRenderers();
export { Blocks, Doc };
