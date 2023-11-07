import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {

  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://strapi-bandproject.onrender.com/graphql/?populate=*',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    }),
    cache: new InMemoryCache(),
  });
  
};

export default createApolloClient;