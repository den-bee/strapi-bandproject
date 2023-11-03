import { MDXRemote } from "next-mdx-remote";
import styles from "./Content.module.css";
import {Post as PostProps} from "@/types";

const Content = ({post} : {post : PostProps}) => {
    
    return (
        <main className={styles.content}>
            <div>{post.attributes.title}</div>
        </main>
    )
}

export default Content;