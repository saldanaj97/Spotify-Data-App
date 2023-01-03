import React from "react";

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
  return (
    <>
      {showModal ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative my-6 mx-auto w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex flex-row items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                  <img className='align-center m-3' src={artist.images[1].url} />
                  <div className='genre-list flex flex-col'>
                    <h3 className='mb-2 w-max text-3xl font-semibold text-black'>{artist.name}</h3>
                    <div className='flex flex-row flex-wrap '>
                      {artist.genres.map((genre) => {
                        return (
                          <div className='genre-pill-container mr-1 mb-1 w-auto rounded-3xl bg-green-700 px-2 py-1 text-sm text-white'>
                            {convertCasing(genre)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-30 outline-none focus:outline-none'
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    <span className='block bg-transparent text-3xl text-black outline-none focus:outline-none'>×</span>
                  </button>
                </div>
                {/*body*/}
                <div className='relative flex-auto px-5 py-2'>
                  <p className='my-2 text-lg leading-relaxed text-slate-500'>{artistDetails.artist.bio.summary.split(/(<a\s)\w+(=)/g)[0]}</p>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
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
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
    </>
  );
}
