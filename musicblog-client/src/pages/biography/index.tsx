import createApolloClient from "@/apollo-client";
import styles from "@/pages/biography/Biography.module.css";
import {Biography as BioProps} from "@/types";
import { graphql } from "@/gql/index";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const GetBiographies = graphql(`
query GetBiographies {
    biographies {
      data {
        id
        attributes {
          title
          content
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
`)

export const getStaticProps = async () => {
  const client = createApolloClient();
  const {data} = await client.query({query: GetBiographies, variables: {}});

  const serializedBios = await Promise.all(
    data.biographies!.data.map(async (bio) => {
      const mdxSource = await serialize(bio.attributes?.content!);
      return {
        id: bio.id,
        attributes: {
          title: bio.attributes?.title,
          content: mdxSource,
          image: bio.attributes?.image?.data?.attributes?.url
        }
      }
    }))   

  return {
    props: {
      biographies: serializedBios
    }
  }   
}

const Biography = ({biographies} : {biographies : BioProps[]}) => {
    return (
        <div className={styles.bioContainer}>
          <ul>
            {
              biographies?.map((biography) => {
                return (
                  <div>
                    <li key={biography.id}>{biography.attributes.title}</li>
                    <li key={biography.id}><img src={biography.attributes.image}/></li>
                    <li key={biography.id}><MDXRemote {...biography.attributes.content}/></li>
                  </div>
                )
              })
            }
          </ul>
        </div>
    )
}

export default Biography;