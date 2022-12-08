import { BlockRenderers } from '@el-next/components/blockRenderers';
import { DocRenderers } from '@el-next/components/docRenderers';

import Image from '@el-next/components/image';

const Blocks: any = BlockRenderers({
  buttonClass:
    'duration-300 bg-white text-black px-9 py-3 mt-2 hover:scale-110 ease-[cubic-bezier(1.000, 0.000, 0.000, 1.000)]',
});

const Doc: any = DocRenderers({
  linkClass: 'border-b-white hover:border-b-4',
});

const ImageOverride: any = (width: number) => { 
  return (props: any) => {
    return (
      <Image
        id={'img-' + props.image.publicId}
        alt={props.image.alt}
        imgId={props.image.publicId}
        aspectDefault={true}
        className={`max-w-[${width}px]`}
      />
    );
  }
};

export { Blocks, Doc, ImageOverride, };
