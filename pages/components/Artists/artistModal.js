import React from "react";
import ArtistInfo from "./artistInfo";

// Function to capitalize the first letter of each word
const convertCasing = (word) => {
  let splitWord = word.split(" ");
  let newWord = "";

  splitWord.forEach((word) => {
    newWord += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return newWord;
};

export default function ArtistInfoModal({ showModal, setShowModal, artist, artistDetails }) {
  // Generate pill shaped containers with the genres the artist falls under
  const GenrePills = () => {
    return (
      <div className='mx-3 mt-1 flex flex-row flex-wrap justify-center'>
        {artist.genres.map((genre) => {
          return (
            <div className='genre-pill-container mr-1 mb-1 w-auto rounded-3xl bg-green-700 px-2 py-1 text-sm text-white'>{convertCasing(genre)}</div>
          );
        })}
      </div>
    );
  };

  // Display the artists name, a short bio, and the source of the bio
  const ArtistBio = () => {
    return (
      <div>
        <h3 className='mb-2 ml-2 w-max text-4xl font-bold text-black'>{artist.name}</h3>
        <div className='relative flex-auto px-3'>
          <p className='text-md mb-2 text-left text-slate-500'>{artistDetails.artist.bio.summary.split(/(<a\s)\w+(=)/g)[0]}</p>
          <div className='text-sm opacity-50'>
            Source: <a href={artistDetails.artist.url}>{artistDetails.artist.url}</a>
          </div>
        </div>
      </div>
    );
  };

  // An 'x' button to close the modal formally
  const CloseModalButton = () => {
    return (
      <button
        className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-30 outline-none focus:outline-none'
        onClick={() => {
          setShowModal(false);
        }}
      >
        <span className='block bg-transparent text-3xl text-black outline-none focus:outline-none'>×</span>
      </button>
    );
  };

  // Button that will allow the user to go to the artists spotify page
  const ViewOnSpotifyButton = () => {
    return (
      <button
        className='mr-1 mb-1 rounded bg-green-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
        type='button'
        onClick={() => {
          setShowModal(false);
          window.open(artist.external_urls.spotify);
        }}
      >
        View on Spotify
      </button>
    );
  };

  return (
    <>
      {showModal ? (
        <div className='fixed inset-0 z-50 flex cursor-default items-center justify-center overflow-y-auto overflow-x-hidden pt-32 outline-none focus:outline-none'>
          <div className='relative my-6 mx-auto w-auto max-w-3xl'>
            <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
              <div className='flex flex-row items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                <div className='flex w-1/3 flex-col'>
                  <img className='align-center mx-3 my-2' src={artist.images[1].url} />
                  <GenrePills />
                </div>
                <div className='bio flex w-2/3 flex-col'>
                  <ArtistBio />
                </div>
                <CloseModalButton />
              </div>
              <ArtistInfo artist={artist} />
              <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-3'>
                <ViewOnSpotifyButton />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
