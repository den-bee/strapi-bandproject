import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const render = "https://strapi-bandproject.onrender.com/graphql/?populate=*"

const local = "http://host.docker.internal:1338/graphql/?populate=*";

const createApolloClient = () => {

  return new ApolloClient({
    link: new HttpLink({
      uri: local,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    }),
    cache: new InMemoryCache(),
  });
  
};

export default createApolloClient;