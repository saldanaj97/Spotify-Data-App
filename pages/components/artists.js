import React from "react";

export default function TopArtists() {
  let testArtists = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];

  return (
    <div className='top-artists-container mx-20 flex w-72 flex-col'>
      <h1 className='text-center text-3xl'>Top Artists</h1>
      <div className='top-artists-list flex flex-col justify-evenly'>
        {testArtists.map((artist) => {
          return (
            <div key={artist} className='card text-green-700'>
              {artist}
            </div>
          );
        })}
      </div>
    </div>
  );
}
