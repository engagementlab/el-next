import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { BaseDocConfig } from '../../config';
import { CreateKey } from '../../hooks';

const Event: Lists.Event = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Event Name',
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
    intro: document(BaseDocConfig()),
    agenda: document(BaseDocConfig([[1, 1]])),
    awards: document(BaseDocConfig()),
    location: document(BaseDocConfig()),
    gallerySlides: relationship({
      ref: 'GallerySlide.gallerySlides',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'caption'],
        inlineCreate: {
          fields: ['image', 'altText', 'caption'],
        },
        inlineEdit: {
          fields: ['image', 'altText', 'caption'],
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
      // console.log()
      return resolvedData;
    },
  },
});
export default Event;
