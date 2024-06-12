import { virtual } from '@keystone-6/core/fields';
import { graphql } from '@keystone-6/core';

export const StudioPreviews = virtual({
  field: graphql.field({
    type: graphql.JSON,
    resolve(item, args, context) {
      const res = context.query.Semester.findMany({
        where: { type: { equals: 'upcoming' } },
        query: `
                  id
                  name
                  key
                  studio {
                      name
                      key
                  }
                  initiatives
                  courseNumber
                  instructors {
                      name
                  }
                  previewThumbnail {
                    publicId
                  }
                  previewThumbAltText
                  previewSummary {
                      document
                  }
                  previewVideo {
                    file
                  }
                  captions {
                    url
                  }
                  previewVideoThumbnail {
                    publicId
                  }`,
      });
      return res;
    },
  }),
  ui: {
    createView: { fieldMode: 'hidden' },
    itemView: { fieldMode: 'hidden' },
    listView: { fieldMode: 'hidden' },
  },
});
