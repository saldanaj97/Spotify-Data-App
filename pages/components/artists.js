import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { fetchTopArtists } from "../api/spotify_calls";
import TimePeriodDropdownMenu from "./dropdown-menu";

export default function UsersTopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [numOfArtists, setNumOfArtists] = useState(5);
  const [timePeriod, setTimePeriod] = useState("all-time");

  // The only terms that work with the spotify web api
  const timePeriodTerms = { "all-time": "long_term", "6 months": "medium_term", "4 weeks": "short_term" };

  useEffect(() => {
    getTopArtists(timePeriod);
  }, [setTopArtists]);

  const getTopArtists = async (period) => {
    let { items } = await fetchTopArtists(timePeriodTerms[period]);
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
      <h1 className='text-center text-3xl'>
        Top Artists {TimePeriodDropdownMenu({ timePeriod: timePeriod, setTimePeriod: setTimePeriod, resetUsersTopList: getTopArtists })}
      </h1>
      <div className='top-artists-list flex flex-col justify-evenly'>
        {topArtists.slice(0, numOfArtists).map((artist) => {
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
        {numOfArtists === 20 ? (
          <div className='less-artists-button flex flex-row justify-center'>
            <button
              onClick={() => {
                let updatedNumOfArtists = 5;
                setNumOfArtists(updatedNumOfArtists);
              }}
            >
              <ChevronUpIcon className='h-8 w-8' />
            </button>
          </div>
        ) : (
          <div className='more-artists-button flex flex-row justify-center'>
            <button
              onClick={() => {
                let updatedNumOfArtists = numOfArtists + 5;
                setNumOfArtists(updatedNumOfArtists);
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
