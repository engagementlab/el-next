import { list } from '@keystone-6/core';
import { json, relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import path from 'path';

import { Lists } from '.keystone/types';
import { CreateKey } from '../../hooks';
import { cloudinaryImage } from '../../../components/cloudinary';

const Slide: Lists.Slide = list({
  access: allowAll,
  fields: {
    initiativeSlides: relationship({
      ref: 'Initiative.slides',
      many: true,
    }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/media',
      },
      label: 'Source',
    }),
    altText: text({
      label: 'Describe appearance of image',
      ui: {
        description: 'This must be defined if using an image.',
      },
    }),
    // video: json({
    //   ui: {
    //     views: path.join(
    //       process.cwd(),
    //       '/admin/components/video/components.tsx'
    //     ),
    //     createView: { fieldMode: 'edit' },
    //     listView: { fieldMode: 'hidden' },
    //     itemView: { fieldMode: 'edit' },
    //   },
    // }),
  },
  //   ui: {
  //     isHidden: true,
  //   },
});
export default Slide;
