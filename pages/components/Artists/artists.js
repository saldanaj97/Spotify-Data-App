import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { fetchTopArtists } from "../../api/spotify_calls";
import TimePeriodDropdownMenu from "../dropdownMenu";
import ArtistCard from "./artistCard";

// The only terms that work with the spotify web api
const timePeriodTerms = { "all-time": "long_term", "6 months": "medium_term", "4 weeks": "short_term" };

export default function UsersTopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [numOfArtists, setNumOfArtists] = useState(5);
  const [timePeriod, setTimePeriod] = useState("all-time");

  useEffect(() => {
    getTopArtists(timePeriod);
  }, [setTopArtists]);

  // Function to fetch the users top artists based on the time period selected in the dropdown
  const getTopArtists = async (period) => {
    let { success, data } = await fetchTopArtists(timePeriodTerms[period]);
    if (success) {
      setTopArtists(data.data.items);
    }
  };

  const LessArtists = () => {
    return (
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
    );
  };

  const MoreArtists = () => {
    return (
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
    );
  };

  return (
    <div className='top-artists-container mx-20 w-80 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>
        Top Artists {TimePeriodDropdownMenu({ timePeriod: timePeriod, setTimePeriod: setTimePeriod, resetUsersTopList: getTopArtists })}
      </h1>
      <div className='top-artists-list'>
        {topArtists.length > 0 ? (
          <div className='flex flex-col justify-evenly'>
            {topArtists.slice(0, numOfArtists).map((artist) => {
              return <ArtistCard artist={artist} key={artist.name} />;
            })}
            <div> {numOfArtists === 20 ? <LessArtists /> : <MoreArtists />}</div>
          </div>
        ) : (
          <div className='text-center'>No Artists</div>
        )}
      </div>
    </div>
  );
}
