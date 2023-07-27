import { BlockRenderers, DocRenderers } from '@el-next/components';
import { CTAButton } from './Buttons';
import { Theme } from '@/types';
const blockOverrides = {
  buttonOverride: (props: { label: string }) => {
    return <CTAButton link="/" label={props.label} theme={Theme.none} />;
  },
};
const SuperBlocks = BlockRenderers();
const Blocks = () => {
  return SuperBlocks(blockOverrides);
};

const Doc: any = DocRenderers();
export { Blocks, Doc };
