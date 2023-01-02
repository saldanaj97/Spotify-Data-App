import React, { useState } from "react";
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

  // Function to change the state of the showModal var which displays/hides the modal
  const getArtistInfo = () => {
    setShowModal(true);
  };

  return (
    <div key={artist.name} className='card flex flex-row text-black'>
      <img className='align-center m-3 h-16 w-16' src={artist.images[0].url} />
      <div className='artist-info flex flex-grow flex-col pt-5'>
        <p className='genre text-black text-opacity-50'>{convertCasing(artist.genres[0])}</p>
        <p className='artist-name'>{artist.name}</p>
      </div>
      <button onClick={getArtistInfo}>More Info</button>
      <ArtistInfoModal showModal={showModal} artist={artist} setShowModal={setShowModal} />
    </div>
  );
}