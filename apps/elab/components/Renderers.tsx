import { BlockRenderers, DocRenderers, Image } from '@el-next/components';
import { CTAButton } from './Buttons';
import { Theme, ThemeConfig } from '@/types';
import CaptionedImage from './CaptionedImage';
import Slideshow from './Slideshow';
import Link from 'next/link';
import { Icons } from './Icons';

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
let AppBlocks = (theme: ThemeConfig | null) => {
  return {
    slideshow: (props: any) => {
      return (
        <Slideshow
          slides={props.slideshow.data.slides}
          themeColor={theme ? theme.bg : 'bg-green'}
        />
      );
    },
    iconLink: (props: any) => {
      return (
        <Link href={props.url}>
          <button className={`${theme?.text} flex flex-row gap-x-2 my-2 group`}>
            <Icons icons={[props.icon]} />
            <span
              className={`font-bold ${theme?.text} border-b-2 ${theme?.border}`}
            >
              {props.label}
            </span>
            <span className="group-hover:translate-x-1 transition-transform">
              ➝
            </span>
          </button>
        </Link>
      );
    },
  };
};
const SuperBlocks = BlockRenderers();
const Blocks = (theme?: ThemeConfig) => {
  // return SuperBlocks(blockOverrides);
  return {
    button: SuperBlocks(blockOverrides).button,
    image: SuperBlocks(blockOverrides).image,
    video: SuperBlocks(blockOverrides).video,
    slideshow: AppBlocks(theme ? theme : null).slideshow,
    iconLink: AppBlocks(theme ? theme : null).iconLink,
  };
};

const Doc: any = DocRenderers();
export { Blocks, Doc };
