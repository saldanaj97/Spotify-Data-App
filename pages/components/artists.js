import React, { useState, useEffect } from "react";
import { fetchTopArtists } from "../api/spotify_calls";
import TimePeriodDropdownMenu from "./dropdown-menu";

export default function UsersTopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [timePeriod, setTimePeriod] = useState("all-time");

  useEffect(() => {
    getTopArtists();
  }, setTopArtists);

  const getTopArtists = async () => {
    let { items } = await fetchTopArtists();
    setTopArtists(items);
  };

  // Function to capitalize the first letter of each word
  const convertCasing = (word) => {
    let splitWord = word.split(" ");
    let newWord = "";

    splitWord.forEach((word) => {
      newWord += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return newWord;
  };

  return (
    <div className='top-artists-container mx-20 w-80 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>Top Artists {TimePeriodDropdownMenu({ timePeriod: timePeriod, setTimePeriod: setTimePeriod })}</h1>
      <div className='top-artists-list flex flex-col justify-evenly'>
        {topArtists.map((artist) => {
          return (
            <div key={artist.name} className='card flex flex-row text-black'>
              <img className='align-center m-3 h-16 w-16' src={artist.images[0].url} />
              <div className='artist-info flex flex-grow flex-col pt-5'>
                <p className='genre text-black text-opacity-50'>{convertCasing(artist.genres[0])}</p>
                <p className='artist-name'>{artist.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
