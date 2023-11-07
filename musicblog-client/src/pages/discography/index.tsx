import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { Discography as DiscoProps } from "@/types";
import styles from "@/pages/discography/Discography.module.css";

const GetDiscography = graphql(`
query GetDiscography {
    discographies {
      data {
        id
        attributes {
          title
          tracklist
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
    const {data} = await client.query({query: GetDiscography, variables: {}});

    return {
        props : {
            discography : data.discographies?.data
        }
    }
}

const Discography = ({discography} : {discography : DiscoProps[]}) => {
    return(
        <div className={styles.discoContainer}>
            <ul>
                {
                discography.map((item) => {
                    return (
                        <li className={styles.listItem}>
                            <li key={item.id}><img src={item.attributes.image.data.attributes.url}/></li>
                            <li key={item.id}>{item.attributes.title}</li>
                            <li key={item.id} >{item.attributes.tracklist}</li>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Discography;
