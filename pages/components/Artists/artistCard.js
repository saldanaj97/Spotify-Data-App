import React, { useState, useEffect } from "react";
import { fetchArtistInfo } from "../../api/spotify_calls";
import ArtistInfoModal from "./artistModal";

// Function to capitalize the first letter of each word
const convertCasing = (word) => {
  let splitWord = word.split(" ");
  let newWord = "";

  splitWord.forEach((word) => {
    newWord += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return newWord;
};

export default function ArtistCard({ artist }) {
  const [showModal, setShowModal] = useState(false);
  const [artistDetails, setArtistDetails] = useState({});

  // Function to change the state of the showModal var which displays/hides the modal
  const getArtistInfo = async (artistName) => {
    let { success, artistInfo } = await fetchArtistInfo(artistName);
    if (success) {
      setArtistDetails(artistInfo.data);
    }
    setShowModal(!showModal);
  };

  return (
    <button
      onClick={() => {
        getArtistInfo(artist.name);
      }}
    >
      <div key={artist.name} className='card flex flex-row text-black'>
        <img className='align-center m-3 h-16 w-16' src={artist.images[0].url} />
        <div className='artist-info flex flex-grow flex-col pt-5 text-left'>
          <p className='genre text-black text-opacity-50'>{convertCasing(artist.genres[0])}</p>
          <p className='artist-name'>{artist.name}</p>
        </div>
        <ArtistInfoModal showModal={showModal} artist={artist} setShowModal={setShowModal} artistDetails={artistDetails} />
      </div>
    </button>
  );
}
