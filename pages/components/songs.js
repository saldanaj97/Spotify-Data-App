import React from "react";

export default function TopSongs() {
  let testSongs = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div className='top-songs-container mx-20 w-72 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>Top Songs</h1>
      {testSongs.map((song) => {
        return <div className='card text-green-700'>Song {song}</div>;
      })}
    </div>
  );
}
