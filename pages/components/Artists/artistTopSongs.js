import React, { useState, useEffect } from "react";
import { fetchArtistDiscography } from "../../api/spotify_calls";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export function PlayOrPauseButton({ track }) {
  const [currentlyPlayingPreview, setCurrentlyPlayingPreview] = useState(false);
  const [currentPreview, setCurrentPreview] = useState("");
  const [oldPreview, setOldPreview] = useState("");

  const previewButtonPressed = (newPreview) => {
    /* ------- No preview currently playing -------- */
    // Update the currentPreview and currentlyPlaying states to the newPreview and true, respectively
    if (!currentlyPlayingPreview) {
      setCurrentPreview(newPreview);
      setCurrentlyPlayingPreview(true);
      newPreview.play();
      return;
    }

    /* ------ A preview is playing  ------- */
    // The user has pressed the pause button on the same preview to pause
    if (newPreview == currentPreview) {
      newPreview.pause();
      newPreview.currentTime = 0;
      setCurrentlyPlayingPreview(false);
      return;
    }

    // The user has pressed play on another preview without pressing pause on the old preview
    oldPreview.pause();
    setOldPreview(currentPreview);
    setCurrentPreview(newPreview);
    currentPreview.play();

    //setTimeout(previewCompleted, 30000);
  };

  return (
    <div
      className='play-pause-button absolute flex w-full bg-black bg-opacity-50'
      onClick={() => {
        let preview = document.getElementById(track.name);
        previewButtonPressed(preview);
      }}
    >
      {currentlyPlayingPreview ? <BsPauseFill className='h-full w-full text-white' /> : <BsPlayFill className='h-full w-full text-white' />}
    </div>
  );
}

export default function TopArtists({ artist }) {
  const [artistDiscography, setArtistDiscography] = useState([]);
  const [previewBeingHovered, setPreviewBeingHovered] = useState(false);

  useEffect(() => {
    getDiscography();
  }, [setArtistDiscography]);

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

  const AlbumCoverButtons = ({ track }) => {
    return (
      <button
        className='flex'
        onMouseEnter={() => {
          setPreviewBeingHovered(true);
        }}
        onMouseLeave={() => {
          setPreviewBeingHovered(false);
        }}
      >
        <img id={track.name + "img"} src={track.album.images[0].url}></img>
        <video id={track.name} width='0px' height='0px' autoPlay='' name={track.name}>
          <source src={track.preview_url} type='audio/mpeg' />
        </video>
        {previewBeingHovered ? <PlayOrPauseButton track={track} /> : <></>}
      </button>
    );
  };

  // Create the list of the artists top 5 tracks
  const ArtistsTopTracks = ({ track, idx }) => {
    return (
      <div key={track.name} className='track m-1 flex flex-col justify-start'>
        <div className='relative flex flex-col'>
          <p className='font-semibold'>{idx + 1}</p>
          <div className='track-album-buttons flex'>
            <AlbumCoverButtons track={track} />
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
  };

  return (
    <div className='discography-container flex flex-col justify-evenly p-3'>
      <p className='top-songs-title text-left text-xl font-semibold'>Current Hits</p>
      <div className='songs-container flex flex-row'>
        {artistDiscography.map((track, index) => {
          return (
            <div>
              <ArtistsTopTracks track={track} idx={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
