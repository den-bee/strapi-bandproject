import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {

  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://host.docker.internal:1338/graphql',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    }),
    cache: new InMemoryCache(),
  });
  
};

export default createApolloClient;