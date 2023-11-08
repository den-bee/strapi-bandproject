import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { serialize } from "next-mdx-remote/serialize";
import {Post as PostProps} from "@/types";
import styles from "@/pages/posts/OlderPosts.module.css";
import { MDXRemote } from "next-mdx-remote";
import { Link } from "@mui/joy";
import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";

const cache = createCache({
    key: "css",
    prepend: true
})

const GetOlderPosts = graphql(`
query GetOlderPosts {
  posts(sort: "published_datetime:ASC") {
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
    <CacheProvider value={cache}>
      <div className={styles.olderPostsContainer}>
        <div className={styles.yearNav}>
          <p>Filter posts by year:</p>
          <div className={styles.buttonGroup}>
            <Link className={styles.yearLink} href={"/posts/2022"}>2022</Link>
            <Link className={styles.yearLink} href={"/posts/2023"}>2023</Link>
          </div>
        </div>
        
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
                  <hr />
                </div>
              )
            })
          }
        </ul>
      </div>
    </CacheProvider>
  )
}

export default OlderPosts