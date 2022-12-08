import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TopArtists from "./components/artists";
import TopSongs from "./components/songs";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Data</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <text className='text-green-700'>Spotify</text> Data App
        </h1>
        <div className='artists-and-songs-container flex w-full flex-row justify-center'>
          <TopArtists />
          <TopSongs />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
