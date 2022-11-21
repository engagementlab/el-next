import {
    list
} from '@keystone-6/core';
import {
    text
} from '@keystone-6/core/fields';
import {
    document
} from '@keystone-6/fields-document';
import { allowAll } from "@keystone-6/core/access"
import {
    Lists
} from '.keystone/types';

import {
    componentBlocks
} from '../../../components/component-blocks';
import { FixButtons } from '../../hooks';

const Home: Lists.Home = list({
    access: allowAll,
    fields: {
        name: text({
            isIndexed: 'unique',
            isFilterable: true,
            // defaultValue: 'Home',
            // ui: {
            //     createView: {
            //         fieldMode: 'hidden'
            //     },
            //     itemView: {
            //         fieldMode: 'read'
            //     }
            // }
        }),
        content: document({
            formatting: {
                headingLevels: [3, 4],
                inlineMarks: true,
                listTypes: true,
                alignment: true,
                blockTypes: true,
                softBreaks: true,
            },
            dividers: true,
            links: true,
            layouts: [
                [1, 1],
            ],
            ui: {
                views: './admin/components/component-blocks'
            },
            componentBlocks,
            
            hooks: {
                resolveInput: async ({
                    listKey,
                    fieldKey,
                    operation,
                    inputData,
                    item,
                    resolvedData,
                    context,
                  }) => { 
                      return FixButtons(resolvedData)
                 },
            }
        }),
    },
    ui: {
        // hideCreate: true,
        // hideDelete: true,
        listView: { 
            initialColumns: ['name']
        }
    },
  });
  export default Home;