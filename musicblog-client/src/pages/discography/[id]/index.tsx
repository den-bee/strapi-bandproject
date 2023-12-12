import createApolloClient from "@/apollo-client";
import styles from "@/pages/discography/[id]/SongById.module.css"
import {Song as SongProps} from "@/types";
import { graphql } from "@/gql/index";

const GetAllSongsId = graphql(`
query GetAllSongsId{
    songs {
        data {
            id
        }
    }
}
`)

const GetSongById = graphql(`
query GetSongById($id: ID) {
    song(id: $id) {
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
    const {data} = await client.query({query: GetAllSongsId, variables: {}});

    const paths = data.songs?.data.map((song) => ({
        params: {id: song.id?.toString()}
    }));

    return {
        paths: paths,
        fallback: false,
    }
}

export const getStaticProps = async ({params} : {params: {id:string}}) => {
    const client = createApolloClient();
    const {data} = await client.query({query: GetSongById, variables: {id: params.id}});

    return {
        props: {
            song: data.song?.data
        }
    }
}

const SongPage = ({song} : {song: SongProps}) => {
    
    return (
        <div className={styles.songContainer}>
            <h1>{song.attributes.title}</h1>
            {song.attributes.video.data !== null ?
                <video controls>
                    <source src={song.attributes.video.data.attributes.url} type="video/mp4"></source>
                </video>
                :
                <p>No video available</p>
            }
            
        </div>
    )
}

export default SongPage;