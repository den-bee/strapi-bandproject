import React from "react";
import styles from "./Header.module.css"
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";

const cache = createCache({
    key: "css",
    prepend: true
})

const Header = () => {

    return (
        <CacheProvider value={cache}>
            <header className={styles.header}>
                <Link href={"/"} className={styles.bandName}>
                    <p>Bee The Mouse</p>
                </Link>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    margin={3}
                    className={styles.nav}
                >
                    <Link className={styles.yearLink} href={"/"}>Home</Link>
                    <Link className={styles.yearLink}href={"/biography"}>Biography</Link>
                    <Link className={styles.yearLink} href={"/discography"}>Discography</Link>
                </Stack>
            </header>
        </CacheProvider>
    )
}

export default Header;