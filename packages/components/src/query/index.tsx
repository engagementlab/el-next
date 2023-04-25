import 'cross-fetch/polyfill';

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { GraphQLError } from 'graphql';
enum ErrorType {
  client,
  empty,
  network,
  query,
}

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

    const isEmpty = Object.values(result.data).every(
      (x) => x === null || (x as unknown[]).length === 0
    );
    if (isEmpty) {
      return {
        error: true,
        type: ErrorType.empty,
        message: 'nodata',
      };
    }
    return result.data[name];
  } catch (err: unknown) {
    console.log('1', err);
    if (err instanceof ApolloError) {
      return {
        error: true,
        // type:
        message: err.message,
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
      error: true,
      // type:
      message: (err as GraphQLError).message,
    };
  }
};
