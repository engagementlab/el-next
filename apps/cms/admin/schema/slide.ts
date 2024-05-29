import { list } from '@keystone-6/core';
import { integer, json, relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

import { Lists } from '.keystone/types';

import { cloudinaryImage } from '../components/cloudinary';
import { helper, HelperIcon } from '../components/helper';
import { azureStorageFile } from '../components/fields-azure/src';
import { video } from '../components/video-field';
import { azConfigCustom } from './azure';

const Slide: Lists.Slide = list({
  access: allowAll,
  fields: {
    slideshowSlides: relationship({
      ref: 'Slideshow.slides',
      many: true,
    }),
    // initiativeSlides: relationship({
    //   ref: 'Initiative.slides',
    //   many: true,
    // }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/media',
      },
      label: 'Source',
    }),

    helper: helper({
      html: 'Please look at <a href="https://docs.google.com/document/d/1OAjHllntfrr_-godz-ekbNEfs0kxrWGymJHgTlXYYQc/edit" target="_blank">this document</a> for tips on alt text.',
      ui: {
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
      iconType: HelperIcon.info,
    }),
    altText: text({
      label: 'Describe appearance of image (alt text) ♿',
      ui: {
        description:
          'This must be defined and is not a caption, but for accessibility purposes.',
      },
    }),
    caption: text({
      ui: {
        description:
          'This is optional and different from the description of the image.',
      },
    }),
    videoId: text({
      label: 'Vimeo ID',
      ui: {
        description: 'Use the image field to specify thumbnail.',
      },
    }),
    video: video(),
    captions: azureStorageFile({
      azureStorageConfig: azConfigCustom('captions'),
      label: 'Video Captions File',
    }),
    order: integer({
      defaultValue: 0,
    }),
  },
  ui: {
    isHidden: true,
  },
});
export default Slide;
