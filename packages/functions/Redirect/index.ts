import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Analytics } from 'analytics';
const googleAnalytics = require('@analytics/google-analytics').default;

const connection = require('../_shared/db')();
const Link = require('../_shared/Link')(connection);
/**
 * Analytics
 */
const analytics = Analytics({
  app: 'Engagement Lab Website',
  version: '2.5',
  plugins: [
    googleAnalytics({
      trackingId: process.env.GA_TRACKING_ID,
    }),
  ],
});

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const errorMsg = `Something went wrong redirecting you. It appears there is no redirect for "elab.works/${req.query.key}" :(. Sorry!`;
  try {
    // Find original of by short url and increment clicks
    const data = await Link.findOneAndUpdate(
      {
        shortUrl: req.query.key,
      },
      {
        $inc: {
          clicks: 1,
        },
      },
      {
        fields: 'originalUrl label',
      }
    ).exec();

    if (!data) {
      context.res = {
        status: 404,
        body: errorMsg,
      };
      return;
    }

    // Track click in GA
    analytics.track('Shortener Click', {
      label: data.label,
      url: data.originalUrl,
    });

    // Send user to URL
    context.res = {
      status: 302,
      headers: { location: data.originalUrl },
      body: null,
    };
  } catch (e) {
    context.res = {
      status: 500,
      body: errorMsg,
    };
  }
};

export default httpTrigger;
