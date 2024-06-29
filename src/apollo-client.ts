import { ApolloClient, InMemoryCache } from '@apollo/client';

export const API_URL = 'https://graphqlzero.almansi.me/api';
const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default client;
