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

  // Retrieve all artists on a track
  const TrackArtists = ({ track }) => {
    let artists = [];
    track.artists.forEach((artist) => {
      if (track.artists[track.artists.length - 1] !== artist) artists.push(artist.name + ", ");
      if (track.artists[track.artists.length - 1] === artist) artists.push(artist.name);
    });
    return artists;
  };

  // Create the list of the artists top 5 tracks
  const ArtistsTopTracks = () => {
    let tracks = artistDiscography.map((track) => {
      return (
        <div className='track w-26 m-1 flex flex-col justify-start'>
          <div className='track-album-art flex justify-start'>
            <img className='h-26 w-26' src={track.album.images[0].url} />
          </div>
          <div className='track-info leading-tight'>
            <p className='track-name text-left text-sm font-semibold'>{track.name}</p>
            <div className='track-artists flex flex-row text-left text-sm'>
              <TrackArtists track={track} />
            </div>
            <p className='album-name text-left text-sm'>{track.album.name}</p>
          </div>
        </div>
      );
    });
    return tracks;
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

      // Add the artist to the array that will be displayed
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
            <img className='h-36 w-36' src={artist.images[0].url} />
            <p className='text-center font-semibold'>{artist.name}</p>
          </div>
        </div>
      );
    });
    return artists;
  };

  return (
    <div className='discography-container m-2 flex flex-col justify-evenly p-5'>
      <div className='artist-top-5-container flex flex-col'>
        <p className='top-songs-title text-left text-xl font-semibold'>Top Songs</p>
        <div className='songs-container flex flex-row '>
          <ArtistsTopTracks />
        </div>
      </div>
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
