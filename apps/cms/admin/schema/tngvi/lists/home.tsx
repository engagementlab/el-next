import {
    list
  } from '@keystone-6/core';
import {
    relationship,
    text
} from '@keystone-6/core/fields';
import {
    document
} from '@keystone-6/fields-document';
import { allowAll } from "@keystone-6/core/access"
import {
    Lists
} from '.keystone/types';

const Home: Lists.Home = list({
    access: allowAll,
    fields: {
        name: text({
            isIndexed: 'unique',
            isFilterable: true,
            defaultValue: 'Home Page',
          ui: {
            createView: {
              fieldMode:'hidden'
            },
            itemView: {
              fieldMode: 'read'
            }
          }
        }),
        intro: document({
            formatting: true,
        }),
        slides: relationship({
          ref: 'HomeSlide.homeSlides',
          many: true,
          ui: {
            displayMode: 'cards',
            cardFields: ['image', 'altText', 'quote'],
            inlineCreate: {
              fields: ['image', 'altText', 'quote']
            },
            inlineEdit: {
              fields: ['image', 'altText', 'quote']
            },
          },
        }),
    },
    ui: {
        hideCreate: true,
        hideDelete: true,
        listView: { 
            initialColumns: ['name']
        }
    },
    graphql: {
        plural: 'HomePage'
    }
  });
  export default Home;