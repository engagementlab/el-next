import { list } from '@keystone-6/core';
import { json, relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

import { Lists } from '.keystone/types';

import { cloudinaryImage } from '../../../components/cloudinary';
import { AccordionDetails } from '@mui/material';
import { CreateKey } from '../../hooks';

const Slideshow: Lists.Slideshow = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      ui: {
        description:
          'It is recommended that you make this as specific as possible to make it easier to find when inserting inside documents.',
      },
    }),
    key: text({
      isIndexed: 'unique',
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    slides: relationship({
      ref: 'Slide.slideshowSlides',
      many: true,
      ui: {
        description:
          'A slide can be either an image or video. If you define both, only the image will display.',
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'caption', 'videoId'],
        inlineCreate: {
          fields: ['image', 'helper', 'altText', 'caption', 'videoId'],
        },
        inlineEdit: {
          fields: ['image', 'altText', 'caption', 'videoId'],
        },
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name'],
    },
  },
  hooks: {
    resolveInput: async ({
      listKey,
      operation,
      inputData,
      item,
      resolvedData,
      context,
    }) => {
      if (resolvedData.name) {
        resolvedData = {
          ...resolvedData,
          key: CreateKey(resolvedData.name),
        };
      }
      return resolvedData;
    },
  },
});
export default Slideshow;
