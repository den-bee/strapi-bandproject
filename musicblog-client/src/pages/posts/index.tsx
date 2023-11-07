import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { serialize } from "next-mdx-remote/serialize";
import {Post as PostProps} from "@/types";
import styles from "@/pages/posts/OlderPosts.module.css";
import { MDXRemote } from "next-mdx-remote";
import { Button, Link } from "@mui/joy";

const GetOlderPosts = graphql(`
query GetOlderPosts {
  posts(sort: "published_datetime:DESC") {
    data {
      id
      attributes {
        title
        content
        published_datetime
        image {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);

export const getStaticProps = async () => {
  const client = createApolloClient();
  const {data} = await client.query({query: GetOlderPosts, variables: {}});

  const serializedPosts = await Promise.all(
    data.posts!.data.map(async (post) => {
      const mdxSource = await serialize(post.attributes?.content!);
      return {
        id: post.id,
        attributes: {
          title: post.attributes?.title,
          content: mdxSource,
          published_datetime: post.attributes?.published_datetime,
          image: post.attributes?.image?.data?.attributes?.url
        }
      }
    }))   

  return {
    props: {
      posts: serializedPosts
    }
  }   
}


const OlderPosts = ({posts} : {posts : PostProps[]}) => {
  
  return (
    <div className={styles.olderPostsContainer}>
      <div className={styles.buttonGroup}>
        <p>Filter posts by year</p>
        <Link href={"/posts/2022"}>2022</Link>
        <Link href="/posts/2023">2023</Link>
      </div>
      
      <ul>
        {
          posts?.map((post) => {
            return (
              <div>
                <li key={post.id}>
                  {post.attributes.title}
                </li>
                <li key={post.id}>
                  <img className={styles.blogImage} src={post.attributes.image}/>
                </li>
                <li key={post.id}>
                  <MDXRemote {...post.attributes.content}/>
                </li>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default OlderPosts