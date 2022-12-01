import { BlockRenderers } from '@el-next/components/blockRenderers';
import { DocRenderers } from '@el-next/components/docRenderers';

const Blocks: any = BlockRenderers({
  buttonClass:
    'duration-300 bg-white text-black px-9 py-3 mt-2 hover:scale-110 ease-[cubic-bezier(1.000, 0.000, 0.000, 1.000)]',
});
const Doc: any = DocRenderers({
  linkClass: 'border-b-white hover:border-b-4',
});
export { Blocks, Doc };
