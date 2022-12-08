import React from "react";

export default function TopArtists() {
  let testArtists = ["One", "Two", "Three", "Four", "Five"];

  return (
    <div className='top-artists-container mx-20 flex w-72 flex-col'>
      <h1 className='text-center text-3xl'>Top Artists</h1>
      <div className='top-artists-list flex flex-col justify-evenly'>
        {testArtists.map((artist) => {
          return (
            <div key={artist} className='card flex flex-row text-black'>
              <div className='align-center flex flex-col justify-center'>Image</div>
              <div className='artist-info flex flex-grow flex-col justify-around'>
                <p className='genre text-black text-opacity-50'>Genre</p>
                <p className='artist-name'>Artist {artist}</p>
              </div>
              <div className='user-num-saved-songs flex flex-col justify-end '> Songs Liked </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
