import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  checkbox,
  multiselect,
  relationship,
  text,
} from '@keystone-6/core/fields';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreateKey } from '../../hooks';

export const PartnersSelect = multiselect({
  type: 'enum',
  options: [
    { label: 'Boston Uncornered', value: 'uncornered' },
    { label: 'Fairmount Indigo CDC Collaborative', value: 'ficdc' },
    { label: 'GreenRoots', value: 'greenroots' },
    { label: 'LDBPI', value: 'ldbpi' },
    {
      label: 'Massachusetts General Hospital Gun Violence Prevention Center',
      value: 'mgh',
    },
    {
      label: 'MA Coalition to Prevent Gun Violence',
      value: 'magv',
    },
    { label: 'Speak for the Trees', value: 'sftt' },
    {
      label: 'Southwest Boston Community Development Corporation',
      value: 'swbcdc',
    },
    { label: 'Teen Empowerment', value: 'teenempowerment' },
    { label: 'City of Boston', value: 'boston' },
  ],
});

export default list({
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
    url: text({ label: 'URL', ui: { description: 'Optional' } }),
    logo: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/logos',
      },
    }),
    researchProject: relationship({
      ref: 'ResearchProject.collaborators',
      many: true,
      // label: 'Partners / Funders',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    researchProjectFunders: relationship({
      // label: 'Partners / Funders',
      ref: 'ResearchProject.funders',
      many: true,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
  },
  ui: { label: 'Partners / Funders', singular: 'Partner/Funder' },
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
