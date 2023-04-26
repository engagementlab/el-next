import 'cross-fetch/polyfill';

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { GraphQLError } from 'graphql';
import { ErrorClass } from '..';
import { camelCase, capitalCase } from 'change-case';

export type TError = {
  class: ErrorClass;
  message?: string;
};

const apollo = new ApolloClient({
  uri: process.env.GRAPHQL_APP
    ? `https://cms.elab.emerson.edu/${process.env.GRAPHQL_APP}/api/graphql`
    : 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
export const Query = async (name: string, queryStr: string) => {
  try {
    const result = await apollo.query({
      query: gql`
            query 
            {
                ${queryStr}
            }
      `,
    });

    // Is entire response empty?
    const isEmpty = Object.values(result.data).every(
      (x) => null === x || (x as unknown[]).length === 0
    );
    if (isEmpty) {
      const error: TError = {
        class: ErrorClass.empty,
        message: Object.keys(result.data)
          .map((key) => {
            return capitalCase(key);
          })
          .join(', '),
      };
      return {
        error,
      };
    }
    return result.data[name];
  } catch (err: unknown) {
    console.log('1', err);
    let error: TError;
    if (err instanceof ApolloError) {
      error = {
        class:
          err.message.indexOf('ECONNREFUSED') > -1
            ? ErrorClass.network
            : ErrorClass.noconnection,
        message: err.message,
      };
    } else {
      const gqlErr = err as GraphQLError;
      error = {
        class:
          gqlErr.message.toLowerCase().indexOf('syntax') > -1
            ? ErrorClass.syntax
            : ErrorClass.client,
        message: gqlErr.message,
      };
    }
    // else if (err instanceof GraphQLError) {
    //   return {
    //     error: true,
    //     // type:
    //     message: err.message,
    //   };
    // }
    return {
      error,
    };
  }
};
