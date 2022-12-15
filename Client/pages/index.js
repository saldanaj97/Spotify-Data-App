import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TopArtists from "./components/artists";
import TopSongs from "./components/songs";

export default function Home() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const SCOPE = process.env.SCOPE || "user-top-read";
  const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000";
  const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT || "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = process.env.RESPONSE_TYPE;

  const [token, setToken] = useState("");

  useEffect(() => {
    // First check if the user is logged in and has a token available for requests
    checkForToken();
  }, []);

  // Function to check if a token already exists for user
  const checkForToken = () => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  };

  // Logout function that will remove the users token from the local storage
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

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
        <div className='login-button'>
          <button className='rounded border-b-4 border-green-700 bg-green-700 py-2 px-4 text-white hover:border-green-700 hover:bg-green-500'>
            {!token ? (
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                Login to Spotify
              </a>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </button>
        </div>
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
