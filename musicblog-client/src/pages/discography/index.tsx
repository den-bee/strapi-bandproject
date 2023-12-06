import createApolloClient from "@/apollo-client";
import { graphql } from "@/gql/index";
import { Discography as DiscoProps, Song } from "@/types";
import styles from "@/pages/discography/Discography.module.css";
import { Link, ListItem } from "@mui/joy";

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
        songs {
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
                            <Link href={"#"} className={styles.tracklist}><p>{item.attributes.songs.data[0].attributes.title}</p></Link>
                        </div>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Discography;
