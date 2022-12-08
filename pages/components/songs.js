import React from "react";

export default function TopSongs() {
  let testSongs = ["1", "2", "3", "4", "5"];
  return (
    <div className='top-songs-container mx-20 w-72 flex-col justify-evenly'>
      <h1 className='text-center text-3xl'>Top Songs</h1>
      {testSongs.map((song) => {
        return (
          <div key={song} className='card flex flex-row text-black'>
            <div className='album-art align-center m-3 flex flex-col justify-center'>Image</div>
            <div className='song-info flex flex-grow flex-col pt-5'>
              <p className='artist'>Artist</p>
              <p className='album-name'>Album</p>
              <p className='song-name '>Song {song}</p>
            </div>
            <div className='user-num-saved-songs flex flex-col justify-end '> # times played </div>
          </div>
        );
      })}
    </div>
  );
}
