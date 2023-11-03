import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { serialize } from "next-mdx-remote/serialize";
import {Post as PostProps, PostShort} from "@/types";
import Content from "@/components/Content/Content";

const getAllPosts = graphql(`
query GetPosts {
    posts {
      data {
        id
        attributes {
          title
          content
          published_datetime
        }
      }
    }
  }
`);

export const getStaticProps = async () => {
  const client = createApolloClient();
  const {data} = await client.query({query: getAllPosts, variables: {}});

  const serializedPosts = await Promise.all(
    data.posts!.data.map(async (post) => {
      const mdxSource = await serialize(post.attributes?.content!);
      return {
        id: post.id,
        attributes: {
          title: post.attributes?.title,
          content: mdxSource,
          published_datetime: post.attributes?.published_datetime,
        }
      }
    }))   

  return {
    props: {
      posts: serializedPosts
    }
  }   
}



const Mainpage = ({posts} : {posts : PostProps[]}) => {
  
  return (
    <div>
      <ul>
        {
          posts?.map((post) => {
            return (
              <li key={post.id}>
                <Content post={post}></Content>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Mainpage;