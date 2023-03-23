import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { parse, ParsedQs } from 'qs';

const connection = require('../_shared/db')();
const Link = require('../_shared/Link')(connection);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (req.rawBody) {
    const parsedData: ParsedQs = parse(req.rawBody);

    const action = parsedData.action;
    let data;
    switch (action) {
      case 'list':
        data = await Link.find({});
        context.res = {
          status: 200,
          body: data,
        };
      case 'create':
        const missingKeys = ['originalUrl', 'shortUrl', 'label'].filter(
          (x) => Object.keys(parsedData).indexOf(x) === -1
        );
        if (missingKeys.length > 0) {
          context.res = {
            status: 400,
            err: true,
            body: `Missing keys: ${missingKeys.join(', ')}`,
          };
          return;
        }
        // Create new link
        const link = new Link({
          originalUrl: parsedData.originalUrl,
          shortUrl: parsedData.shortUrl,
          label: parsedData.label,
          date: new Date().toISOString(),
        });
        try {
          data = await link.save();
        } catch (err) {
          context.res = {
            status: 500,
            err: true,
            body: {
              msg: err.message,
              key: err.keyPattern,
            },
          };
          return;
        }
        context.res = {
          status: 200,
          body: data,
        };
        break;
      case 'update':
        break;
      default:
        context.res = {
          status: 400,
          err: true,
          body: 'Missing action',
        };
        break;
    }
    return;
  }

  context.res = {
    body: 'No raw body data',
  };
};

export default httpTrigger;
