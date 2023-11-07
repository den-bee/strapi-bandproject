import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { serialize } from "next-mdx-remote/serialize";
import {Post as PostProps} from "@/types";
import styles from "../styles/Home.module.css";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

const GetAllPosts = graphql(`
query GetAllPosts($limit: Int) {
    posts(sort: "published_datetime:DESC", pagination: { limit: $limit }) {
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
  const {data} = await client.query({query: GetAllPosts, variables: {limit:2}});

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

const Home = ({posts} : {posts : PostProps[]}) => {
  
  return (
    <div className={styles.homeContainer}>
      <ul>
        {
          posts?.map((post) => {
            return (
              <div className={styles.blogPost}>
                <li key={post.id}>
                  <h1>{post.attributes.title}</h1>
                </li>
                <li key={post.id}>
                  <img className={styles.blogImage} src={post.attributes.image}/>
                </li>
                <li key={post.id}>
                  <MDXRemote {...post.attributes.content}/>
                </li>
                <hr className={styles.line} />
              </div>
            )
          })
        }
      </ul>
      <Link className={styles.showOlderLink} href="/posts">Show older</Link>
    </div>
  )
}

export default Home;

