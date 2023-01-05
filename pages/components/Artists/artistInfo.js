import React, { useState, useEffect } from "react";
import { fetchArtistDiscography, fetchRelatedArtists } from "../../api/spotify_calls";

export default function ArtistInfo({ artist }) {
  const [artistDiscography, setArtistDiscography] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    getDiscography();
    getRelatedArtists();
  }, [setArtistDiscography, setRelatedArtists]);

  // Get the artists top 5 albums and songs
  const getDiscography = async () => {
    let { data } = await fetchArtistDiscography(artist.id);
    let topFive = data.tracks.slice(0, 5);
    setArtistDiscography(topFive);
  };

  // Retrieve the related artists based on a users top artist
  const getRelatedArtists = async () => {
    let { data } = await fetchRelatedArtists(artist.id);
    let artists = data.artists;
    setRelatedArtists(artists);
  };

  // Create the list of the artists top 5 tracks
  const ArtistsTopTracks = () => {
    let tracks = artistDiscography.map((track) => {
      return (
        <div className='track flex flex-row '>
          <img className='track-album-art m-0.5 h-5 w-5' src={track.album.images[0].url} />
          <div className='track-name'>{track.name}</div>
        </div>
      );
    });
    return tracks;
  };

  // Get 5 random artists from the list of related artists with and make sure of no duplicates
  const generateFiveRelatedArtists = () => {
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

      // Add the artist to the array that will be displayed
      if (artist && !seen) {
        artistsToDisplay.push(artist);
      }
    }

    return artistsToDisplay;
  };

  // Display 5 related artists
  const RelatedArtists = () => {
    let artistsToDisplay = generateFiveRelatedArtists();
    let artists = artistsToDisplay.map((artist) => {
      return <div>{artist.name}</div>;
    });
    return artists;
  };

  return (
    <div className='discography-container m-2 flex flex-row justify-evenly'>
      <div className='artist-top-5-container flex flex-col justify-center'>
        <p className='text-lg font-semibold'>Top Songs</p>
        <ArtistsTopTracks />
      </div>
      <div className='similar-artists flex flex-col justify-center'>
        <p className='text-lg font-semibold'>Others also listen to</p>
        <RelatedArtists />
      </div>
    </div>
  );
}
