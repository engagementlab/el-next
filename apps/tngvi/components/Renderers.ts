import { BlockRenderers, DocRenderers } from '@el-next/components';

const Blocks: any = BlockRenderers({
  buttonClass:
    'block lg:inline-block rounded-full px-9 py-7 mt-4 uppercase whitespace-nowrap bg-lynx text-bluegreen border-2 border-bluegreen transition-all duration-700 hover:bg-green-blue hover:text-lynx hover:border-green-blue hover:scale-105',
});
const Doc: any = DocRenderers();
export { Blocks, Doc };
