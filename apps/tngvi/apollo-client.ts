import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

console.log('apollo', process.env.APOLLO_CLIENT_GRAPHQL_URI);
const apollo = new ApolloClient({
  uri:
    process.env.APOLLO_CLIENT_GRAPHQL_URI ||
    'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
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
    console.log(result);
    return result.data[name];
  } catch (err: any) {
    if (err.networkError) console.error(err.networkError.result);
    else console.error(err);
  }
};
export default query;
