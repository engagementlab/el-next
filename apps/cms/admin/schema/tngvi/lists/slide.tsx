import {
  list
} from '@keystone-6/core';
import {
  relationship,
  text
} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import {
  Lists
} from '.keystone/types';
import {
  cloudinaryImage
} from '../../../components/cloudinary';

export const Slide: Lists.HomeSlide = list({
    access: allowAll,
    fields: {
      homeSlides: relationship({
        ref: 'Home.slides',
        many: true,
      }),
      image: cloudinaryImage({
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_SECRET}`,
          folder: 'tngvi/media',
        },
        label: 'Source',
      }),
      altText: text({
        validation: {
          isRequired: true
        },
        label: 'Describe appearance of image'
      }),
      quote: text({
        validation: {
          isRequired: true,
        },
        label: 'Related quote (omit “”)'
      }),
    },
    ui: {
      isHidden: true,
      // labelField: 'imageName',
    },
  });