import { graphql, list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { HelperIcon, helper } from '../../../components/helper';

const Initiative: Lists.Initiative = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Initiative Name',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    intro: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    // helper: helper({
    //   html: 'A slide can be <i>either</i> an image or video. If you define both, only the image will display. ',
    //   iconType: HelperIcon.info,
    //   ui: {
    //     itemView: { fieldMode: 'read' },
    //     listView: { fieldMode: 'hidden' },
    //   },
    // }),
    slides: relationship({
      ref: 'Slide.initiativeSlides',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'videoId'],
        inlineCreate: {
          fields: ['image', 'altText', 'videoId'],
        },
        inlineEdit: {
          fields: ['image', 'altText', 'videoId'],
        },
      },
    }),
  },
  ui: {
    // hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
  },
});
export default Initiative;
