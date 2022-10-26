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
import { allowAll } from "@keystone-6/core/access";
import {
    Lists
} from '.keystone/types';
import path from 'path';
import {
    componentBlocks
} from '../../../components/component-blocks';
import { FixButtons } from '../../hooks';

const About: Lists.About = list({
    access: allowAll,
    fields: {
        name: text({
            isIndexed: 'unique',
            isFilterable: true,
            defaultValue: 'About Page',
            ui: {
                createView: {
                    fieldMode: 'hidden'
                },
                itemView: {
                    fieldMode: 'read'
                }
            }
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
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
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
        values: document({
            label: 'Our Values',
            formatting: {
                headingLevels: [4, 5],
                inlineMarks: true,
                softBreaks: true,
            },
            ui: {
                views: './admin/components/component-blocks'
            },
            componentBlocks,
        }),
    },
    ui: {
        hideCreate: true,
        hideDelete: true,
        listView: { 
            initialColumns: ['name']
        }
    },
  });
  export default About; 