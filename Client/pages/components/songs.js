import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TopSongs() {
  let testSongs = ["1", "2", "3", "4", "5"];

  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    fetchTopSongs();
  }, setTopSongs);

  const fetchTopSongs = async () => {
    let token = window.localStorage.getItem("token");
    if (token) {
      let { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTopSongs(data.items);
    }
  };

  return (
    <div className='top-songs-container mx-20 w-72 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>Top Songs</h1>
      {topSongs.map((song) => {
        return (
          <div key={song.name} className='card flex flex-row text-black'>
            <div className='album-art align-center m-3 flex flex-col justify-center'>
              <img src={song.album.images[2].url} />
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
