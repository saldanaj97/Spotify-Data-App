import React, { useState, useEffect } from "react";
import { fetchTopArtists } from "../api/spotify_calls";

export default function UsersTopArtists() {
  let [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    getTopArtists();
  }, setTopArtists);

  const getTopArtists = async () => {
    let { items } = await fetchTopArtists();
    setTopArtists(items);
  };

  return (
    <div className='top-artists-container mx-20 w-72 flex-col'>
      <h1 className='text-center text-3xl'>Top Artists</h1>
      <div className='top-artists-list flex flex-col justify-evenly'>
        {topArtists.map((artist) => {
          return (
            <div key={artist} className='card flex flex-row text-black'>
              <img className='align-center m-3 flex h-16 w-16 flex-col justify-center' src={artist.images[2].url} />
              <div className='artist-info flex flex-grow flex-col pt-5'>
                <p className='genre text-black text-opacity-50'>{artist.genres[0]}</p>
                <p className='artist-name'>{artist.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
