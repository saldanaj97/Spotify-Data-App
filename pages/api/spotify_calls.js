import axios from "axios";

/**
 * Fetches the users top 20 played songs
 * @return {object} data object containing information about the users top played songs
 */
export const fetchTopSongs = async () => {
  let token = window.localStorage.getItem("token");
  if (token) {
    let { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
};

/**
 * Fetches the users top 20 artists
 * @param  {} none
 * @return {object} data object containing information about the users top artists
 */
export const fetchTopArtists = async () => {
  let token = window.localStorage.getItem("token");
  if (token) {
    let { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
};
