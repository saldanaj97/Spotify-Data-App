import React, { useState, useEffect } from "react";
import { fetchRelatedArtists } from "../../api/spotify_calls";

export default function RelatedArtists({ artist }) {
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    getRelatedArtists();
  }, [setRelatedArtists]);

  // Retrieve the related artists based on a users top artist
  const getRelatedArtists = async () => {
    let { data } = await fetchRelatedArtists(artist.id);
    let artists = data.artists;
    setRelatedArtists(artists);
  };

  // Get 5 random artists from the list of related artists with and make sure of no duplicates
  const generateFourRelatedArtists = () => {
    let artistsToDisplay = [];

    for (let i = 0; i < 5; i++) {
      // Get a random artist from the list
      let artist = relatedArtists[Math.floor(Math.random() * relatedArtists.length)];

      // Check for duplicates before adding to display array
      let seen = Object.values(artistsToDisplay).includes(artist);
      while (seen) {
        artist = relatedArtists[Math.floor(Math.random() * relatedArtists.length)];
        seen = Object.values(artistsToDisplay).includes(artist);
      }

      // Add the artist to the array that will be displayed to user
      if (artist && !seen) {
        artistsToDisplay.push(artist);
      }
    }

    return artistsToDisplay;
  };

  // Display 5 related artists
  const RelatedArtists = () => {
    let artistsToDisplay = generateFourRelatedArtists();
    let artists = artistsToDisplay.map((artist) => {
      return (
        <div className='flex flex-col'>
          <div className='m-1 flex flex-col'>
            <img className='h-40 w-48' src={artist.images[0].url} />
            <p className='text-center font-semibold'>{artist.name}</p>
          </div>
        </div>
      );
    });
    return artists;
  };

  return (
    <div className='discography-container flex flex-col justify-evenly p-3'>
      <div className='similar-artists flex flex-row justify-around'>
        <div className='related-artist-container flex flex-col'>
          <p className='text-left text-xl font-semibold'>Others also listen to</p>
          <div className='artists-container flex flex-row'>
            <RelatedArtists />
          </div>
        </div>
      </div>
    </div>
  );
}
