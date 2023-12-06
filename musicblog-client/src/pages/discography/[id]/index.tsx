import createApolloClient from "@/apollo-client";
import styles from "@/pages/discography/[id]/SongById.module.css"
import {Song as SongProps} from "@/types";
import { graphql } from "@/gql/index";

const GetSongById = graphql(`
query GetSongById {
    songs {
        data {
            id
            attributes {
                title
                video {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                album {
                    data {
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

export const getStaticPaths = async () => {
    const client = createApolloClient();
    const {data} = await client.query({query: GetSongById, variables: {}});

    const paths = data.songs?.data.map((song) => ({
        params: {id: song.id?.toString()}
    }));

    return {
        paths: paths,
        fallback: false,
    }
}

export const getStaticProps = async ({params} : {params : {id: number}}) => {
    const client = createApolloClient();
    const {data} = await client.query({query: GetSongById, variables: {}});

    return {
        props: {
            song: data.songs?.data
        }
    }
}

const SongPage = ({song} : {song: SongProps}) => {
    return (
        <div className={styles.songContainer}>
            <h1>TITEL</h1>
            <h1>VIDEO</h1>
            <video src={"#"}>VIDEO</video>
        </div>
    )
}

export default SongPage;