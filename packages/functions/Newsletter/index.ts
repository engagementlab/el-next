/**
 * @fileoverview Engagement Lab initiatives content service
 * @copyright Engagement Lab at Emerson College, 2022
 *
 * @author Johnny Richardson
 * @description
 *
 * ==========
 */

const { createHash } = require('node:crypto');
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import mailchimp = require('@mailchimp/mailchimp_marketing');

const newsletterSignup: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!listId) {
    context.res = {
      status: 500,
      body: 'Missing MAILCHIMP_LIST_ID!',
    };
    return;
  }
  if (!process.env.MAILCHIMP_KEY) {
    context.res = {
      status: 500,
      body: 'Missing MAILCHIMP_KEY!',
    };
    return;
  }

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: 'us6',
  });

  const queryKeys = Object.keys(req.query);
  queryKeys.splice(queryKeys.indexOf('email'), 1);
  const tagsFormatted = queryKeys.map((tag) => {
    return tag.toLocaleUpperCase();
  });
  try {
    const memberRes = await mailchimp.lists.getListMember(
      listId,
      req.query.email
    );
    // If already subscribed, modify member tags
    if (memberRes.list_id === listId) {
      const subscriberHash = createHash('md5')
        .update(req.query.email.toLowerCase())
        .digest('hex');
      const response = await mailchimp.lists.updateListMemberTags(
        listId,
        subscriberHash,
        { tags: [{ name: 'name', status: 'active' }] }
      );
      console.log(response);
    }
  } catch (err) {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: req.query.email,
        tags: tagsFormatted,
        status: 'subscribed',
      });

      if (response) {
        context.res = {
          status: 200,
          body: response,
        };
      }
    } catch (e) {
      if (e.response && e.response.body.title === 'Member Exists') {
        context.res = {
          status: 409,
          body: 'already_subscribed',
        };
        return;
      }

      context.res = {
        status: 500,
        body: e,
      };
    }
    context.log(err);
  }
};

export default newsletterSignup;
