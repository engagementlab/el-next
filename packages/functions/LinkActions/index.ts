import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const connection = require('../_shared/db')();
const Link = require('../_shared/Link')(connection);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const action = req.query.action;

  // switch(action) {
  //     case 'create':
  //         break;
  //         case 'update':
  //             break;

  //   const link = new Link(req.body);
  //   const data = await link.save();

  const data = await Link.find({});
  context.res = data;
};

export default httpTrigger;
