import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

import { CreateKey } from './hooks';

const Fields = {
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
      cardFields: ['image', 'altText', 'caption', 'video', 'order'],
      inlineCreate: {
        fields: ['image', 'helper', 'altText', 'caption', 'video', 'order'],
      },
      inlineEdit: {
        fields: ['image', 'altText', 'caption', 'video', 'order'],
      },
    },
  }),
};
const Slideshow = (additionalFields: any = {}) => {
  Object.assign(Fields, additionalFields);
  return list({
    access: allowAll,
    fields: Fields,

    ui: {
      listView: {
        initialColumns: ['name'],
      },
      description: 'Create slideshows here for use in any document.',
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
};
export default Slideshow;
