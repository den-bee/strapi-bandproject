import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { Discography as DiscoProps, Song as SongProps } from "@/types";
import styles from "@/pages/discography/Discography.module.css";
import Tracklist from "@/components/Tracklist/Tracklist";
import Link from "next/link";

const GetDiscography = graphql(`
query GetDiscography {
  discographies {
    data {
      id
      attributes {
        title
        image {
          data {
            attributes {
              url
            }
          }
        }
        songs(sort: "id:asc") {
          data {
            id
            attributes {
              title
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
                        <div key={item.id} className={styles.listItem}>
                            <li><img src={item.attributes.image.data.attributes.url}/></li>
                            <li className={styles.tracklist}><h1>{item.attributes.title}</h1></li>
                            <Tracklist songs={item.attributes.songs.data}/>
                        </div>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Discography;
