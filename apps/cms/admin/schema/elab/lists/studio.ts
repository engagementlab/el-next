import { list } from '@keystone-6/core';
import {
  checkbox,
  integer,
  json,
  multiselect,
  relationship,
  select,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import path from 'path';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { helper } from '../../../components/helper';
import { Theme } from '../../../../../elab/types';

const Studio: Lists.Studio = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
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
    createdDate: CreatedTimestamp,
    instructors: relationship({
      ref: 'Person.studios',
      many: true,
    }),
    description: text({
      label: 'Studio Description',
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: 'textarea',
      },
    }),
    initiatives: multiselect({
      type: 'enum',
      options: [
        { label: 'Gun Violence', value: 'gunviolence' },
        { label: 'Climate', value: 'climate' },
        { label: 'Incarceration', value: 'incarceration' },
      ],
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
export default Studio;
