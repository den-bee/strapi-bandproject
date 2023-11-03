import React from "react";
import styles from "./Header.module.css"
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import NextLink from 'next/link';


const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.bandName}>
                <p>Bee The Mouse</p>
            </div>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={3}
            >
                <Link href={"/"}>Home</Link>
                <Link>Biography</Link>
                <Link>Discography</Link>
                <Link>Overview</Link>
            </Stack>
        </header>
    )
}

export default Header;