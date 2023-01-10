import React, { useState, useEffect } from "react";
import { fetchArtistDiscography } from "../../api/spotify_calls";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export default function TopArtists({ artist }) {
  const [artistDiscography, setArtistDiscography] = useState([]);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    getDiscography();
  }, [setArtistDiscography, setShowPlayButton]);

  // Get the artists top 5 albums and songs
  const getDiscography = async () => {
    let { data } = await fetchArtistDiscography(artist.id);
    let topFive = data.tracks.slice(0, 5);
    setArtistDiscography(topFive);
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

  const playPauseButton = (track) => {
    let preview = document.getElementById(track.name);
    if (showPlayButton) {
      preview.play();
    } else {
      preview.pause();
      preview.currentTime = 0;
    }

    //setTimeout(previewCompleted, 30000);
  };

  const AlbumTitleButton = ({ track }) => {
    return (
      <div
        className='flex'
        onMouseEnter={() => {
          setShowPlayButton(true);
        }}
        onMouseLeave={() => {
          setShowPlayButton(false);
        }}
      >
        <img id={track.name} src={track.album.images[0].url}></img>
        <video id={track.name} width='0px' height='0px' autoPlay='' name={track.name}>
          <source src={track.preview_url} type='audio/mpeg' />
        </video>
        {showPlayButton ? (
          <div className='play-pause-button absolute top-0 flex w-full bg-black bg-opacity-50'>
            <BsPlayFill className='h-full w-full text-white' />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  // Create the list of the artists top 5 tracks
  const ArtistsTopTracks = () => {
    return artistDiscography.map((track) => {
      return (
        <div key={track.name} className='track m-1 flex flex-col justify-start'>
          <div className='relative flex flex-col'>
            <div className='track-album-buttons flex'>
              <AlbumTitleButton track={track} />
            </div>
            <div className='track-info leading-tight'>
              <p className='track-name text-left text-sm font-semibold'>{track.name}</p>
              <div className='track-artists flex flex-row text-left text-sm'>
                <TrackArtists track={track} />
              </div>
              <p className='album-name text-left text-sm'>{track.album.name}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className='discography-container m-2 flex flex-col justify-evenly p-5'>
      <p className='top-songs-title text-left text-xl font-semibold'>Top Songs</p>
      <div className='songs-container flex flex-row'>
        <ArtistsTopTracks />
      </div>
    </div>
  );
}
