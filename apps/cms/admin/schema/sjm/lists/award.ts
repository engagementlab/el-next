import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { BaseDocConfig } from '../../config';
import { CreateKey } from '../../hooks';
import { cloudinaryImage } from '../../../components/cloudinary';

const Award: Lists.Award = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Award Name',
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
    apply: document(BaseDocConfig()),
    bgImage1: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'sjm/backgrounds',
      },
      label: 'Past Recipients Image',
    }),
    pastRecipients: document(BaseDocConfig()),
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
export default Award;
