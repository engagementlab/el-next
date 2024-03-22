import { text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '../../components/cloudinary';
import { HelperIcon, helper } from '../../components/helper';

const defaultDescription =
  'Advancing peace, equity, and justice through collaborative design and storytelling.';

export const Social = (descriptionHelper?: string) => {
  return {
    label: 'Social (Optional)',
    description: 'Configures social media previews for this page.',
    fields: {
      ogImage: cloudinaryImage({
        label: 'Open Graph Image',
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_SECRET}`,
          folder: 'elab-home-v3.x/social',
        },
        ui: {
          itemView: { fieldPosition: 'sidebar' },
          description: 'Uses thumbnail by default where possible',
        },
      }),
      helper: helper({
        html: `<a href="#" onClick="alert(\'${defaultDescription}\')")>Default description</a> will show if not specified.`,
        iconType: HelperIcon.info,
        ui: {
          listView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: 'hidden',
          },
          createView: {
            fieldMode: descriptionHelper ? 'hidden' : 'edit',
          },
        },
      }),
      ogDescription: text({
        label: 'Page Description',
        ui: {
          itemView: { fieldPosition: 'sidebar' },
          description: descriptionHelper ? descriptionHelper : '',
        },
      }),
    },
  };
};
