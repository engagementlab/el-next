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

const GallerySlide: Lists.GallerySlide = list({
    access: allowAll,
    fields: {
      gallerySlides: relationship({
        ref: 'Event.gallerySlides',
        many: true,
      }),
      image: cloudinaryImage({
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_SECRET}`,
          folder: 'sjm/gallery',
        },
        label: 'Source',
      }),
      altText: text({
        validation: {
          isRequired: true
        },
        label: 'Describe appearance of image'
      }),
      caption: text({
        label: 'Caption (optional)',
      }),
    },
    ui: {
      isHidden: true,
    },
  });
export default GallerySlide;
