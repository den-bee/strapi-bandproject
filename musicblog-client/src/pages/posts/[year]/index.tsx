import createApolloClient from "@/apollo-client";
import styles from "@/pages/posts/[year]/PostsByYear.module.css"
import { graphql } from "@/gql/index";
import { serialize } from "next-mdx-remote/serialize";
import {Post as PostProps} from "@/types";
import { MDXRemote } from "next-mdx-remote";
import { Link } from "@mui/joy";

const GetPostsByYear = graphql(`
query GetPostsByYear {
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

export const getStaticPaths = async () => {
  const client = createApolloClient();
  const {data} = await client.query({query: GetPostsByYear, variables: {}});

  const paths = data.posts!.data.map((post) => ({
    params: {year: post.attributes?.published_datetime.substring(0,4)}
  }))

  paths.filter((paramYear, index) => {
    let pathIndex = paths.findIndex((p) => paramYear.params.year === p.params.year);
    
    return index === pathIndex
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params} : {params: {year: string}}) => {
  const client = createApolloClient();
  const {data} = await client.query({query: GetPostsByYear, variables: {}});

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

  const postsByYear = serializedPosts.filter(post => post.attributes.published_datetime.substring(0, 4) === params.year)

  return {
    props: {
      posts: postsByYear,
    }
  }   
}



const PostsByYear = ({posts} : {posts : PostProps[]}) => {
  
  return (
    
    <div className={styles.yearContainer}>
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
  )
}

export default PostsByYear