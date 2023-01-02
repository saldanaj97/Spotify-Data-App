import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { fetchTopSongs } from "../api/spotify_calls";
import TimePeriodDropdownMenu from "./dropdownMenu";

export default function UsersTopSongs() {
  const [topSongs, setTopSongs] = useState([]);
  const [numOfSongs, setNumOfSongs] = useState(5);
  const [timePeriod, setTimePeriod] = useState("all-time");

  // The only terms that work with the spotify web api
  const timePeriodTerms = { "all-time": "long_term", "6 months": "medium_term", "4 weeks": "short_term" };

  useEffect(() => {
    getTopSongs(timePeriod);
  }, [setTopSongs, numOfSongs]);

  const getTopSongs = async (period) => {
    let { items } = await fetchTopSongs(timePeriodTerms[period]);
    setTopSongs(items);
  };

  return (
    <div className='top-songs-container mx-20 w-80 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>
        Top Songs {TimePeriodDropdownMenu({ timePeriod: timePeriod, setTimePeriod: setTimePeriod, resetUsersTopList: getTopSongs })}
      </h1>
      <div className='top-songs-list flex flex-col justify-evenly'>
        {topSongs.slice(0, numOfSongs).map((song) => {
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
        {numOfSongs === 20 ? (
          <div className='less-songs-button flex flex-row justify-center'>
            <button
              onClick={() => {
                let updatedNumberOfSongs = 5;
                setNumOfSongs(updatedNumberOfSongs);
              }}
            >
              <ChevronUpIcon className='h-8 w-8' />
            </button>
          </div>
        ) : (
          <div className='more-songs-button flex flex-row justify-center'>
            <button
              onClick={() => {
                let updatedNumOfSongs = numOfSongs + 5;
                setNumOfSongs(updatedNumOfSongs);
              }}
            >
              <ChevronDownIcon className='h-8 w-8' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
