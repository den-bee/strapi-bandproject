import { Link } from "@mui/joy";
import {Song as SongProps} from "@/types";
import styles from "@/components/Tracklist/Tracklist.module.css"

const Tracklist = ({songs} : {songs : SongProps[]}) => {
    console.log(songs);
    return (
        <ul className={styles.tracklist}>
            {
            songs.map((song) => (
                    <li key={song.id}><Link className={styles.songtitle} href={"/discography/" + song.id.toString()}>{song.attributes.title}</Link></li>
                ))
            }
        </ul>
        
        
    )
}

export default Tracklist;