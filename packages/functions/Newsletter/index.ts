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

  const email = req.query.email;

  const queryKeys = Object.keys(req.query);
  queryKeys.splice(queryKeys.indexOf('email'), 1);
  let tagsFormatted = [];

  queryKeys.forEach((tag) => {
    if (req.query[tag] === 'true' || req.query[tag] === 'false')
      tagsFormatted.push(tag);
  });
  try {
    const memberRes = await mailchimp.lists.getListMember(listId, email);
    if (memberRes.list_id === listId) {
      const subscriberHash = createHash('md5')
        .update(email.toLowerCase())
        .digest('hex');
      // If already subscribed and get tags flag is in query, get member's tags
      if (req.query.get_tags === 'true')
        try {
          const response = await mailchimp.lists.getListMemberTags(
            listId,
            subscriberHash
          );

          context.res = {
            status: 200,
            body: {
              msg: 'got_tags',
              tags: response.tags,
            },
          };
        } catch (e) {
          console.log(e);
        }
      // Or, if already subscribed, modify member tags
      else
        try {
          const tagsForSubmit = tagsFormatted.map((tag) => {
            if (tag)
              return {
                name: tag.toLocaleUpperCase(),
                // Status based on the query string
                status: JSON.parse(req.query[tag]) ? 'active' : 'inactive',
              };
          });
          await mailchimp.lists.updateListMemberTags(listId, subscriberHash, {
            tags: tagsForSubmit,
          });

          context.res = {
            status: 200,
            body: {
              msg: 'modified_tags',
            },
          };
        } catch (e) {
          console.log(e);
        }
    }
  } catch (err) {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        tags: queryKeys
          .filter((tag) => req.query[tag] === 'true')
          .map((tag) => {
            return tag.toUpperCase();
          }),
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
