import React, { useState, useEffect } from "react";
import { fetchTopSongs } from "../api/spotify_calls";

export default function UsersTopSongs() {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    getTopSongs();
  }, setTopSongs);

  const getTopSongs = async () => {
    let { items } = await fetchTopSongs();
    setTopSongs(items);
  };

  return (
    <div className='top-songs-container mx-20 w-72 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>Top Songs</h1>
      {topSongs.map((song) => {
        return (
          <div key={song.name} className='card flex flex-row text-sm text-black'>
            <div className='album-art align-center m-3 flex flex-col justify-center'>
              <img className='h-16 w-16' src={song.album.images[2].url} />
            </div>
            <div className='song-info flex flex-grow flex-col pt-5'>
              <p className='artist'>{song.artists[0].name}</p>
              <p className='album-name'>{song.album.name}</p>
              <p className='song-name '>{song.name}</p>
            </div>
            {/*             <div className='user-num-saved-songs flex flex-col justify-end '> {song.popularity}</div>
             */}
          </div>
        );
      })}
    </div>
  );
}
