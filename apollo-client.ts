import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

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
const query = async (name: string, queryStr: string) => {
  try {
    const result = await apollo.query({
      query: gql`
            query 
            {
                ${queryStr}
            }
      `,
    });

    return result.data[name];
  } catch (err: any) {
    if (err.networkError) console.error(err.networkError);
    else console.error(err);
  }
};
export default query;
