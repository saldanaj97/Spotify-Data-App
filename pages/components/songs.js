import React, { useState, useEffect } from "react";
import { fetchTopSongs } from "../api/spotify_calls";
import TimePeriodDropdownMenu from "./dropdown-menu";

export default function UsersTopSongs() {
  const [topSongs, setTopSongs] = useState([]);
  const [timePeriod, setTimePeriod] = useState("all-time");

  useEffect(() => {
    getTopSongs();
  }, setTopSongs);

  const getTopSongs = async () => {
    let { items } = await fetchTopSongs();
    setTopSongs(items);
  };

  return (
    <div className='top-songs-container mx-20 w-80 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>Top Songs {TimePeriodDropdownMenu({ timePeriod: timePeriod, setTimePeriod: setTimePeriod })}</h1>
      <div className='top-songs-list flex flex-col justify-evenly'>
        {topSongs.map((song) => {
          return (
            <div key={song.name} className='card flex flex-row text-sm text-black'>
              <img className='align-center m-3 h-16 w-16' src={song.album.images[2].url} />
              <div className='song-info flex flex-grow flex-col pt-5'>
                <p className='artist'>{song.artists[0].name}</p>
                <p className='album-name'>{song.album.name}</p>
                <p className='song-name '>{song.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
