import axios from "axios";

/**
 * Fetches the users top 20 played songs
 * @param  {string} timePeriod string consisting of the time period we need data for
 * @return object containing information about the users top played songs as well as a success bool
 */
export const fetchTopSongs = async (timePeriod) => {
  // The users auth token
  const TOKEN = window.localStorage.getItem("token");
  try {
    if (!TOKEN) {
      throw error("No user api token found");
    }
    let { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        time_range: timePeriod,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, location: "fetchTopSongs", error: error.message };
  }
};

/**
 * Fetches the users top 20 artists
 * @param  {string} timePeriod string consisting of the time period we need data for
 * @return object containing information about the users top artists and a success bool
 */
export const fetchTopArtists = async (timePeriod) => {
  const TOKEN = window.localStorage.getItem("token");
  try {
    if (!TOKEN) {
      throw error("No user api token found");
    }
    let data = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        time_range: timePeriod,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, location: "fetchTopArtists", error: error.message };
  }
};

/**
 * Fetches the users top 20 artists
 * @param  {string} artistName string consisting of the artists musician name
 * @return object containing information about the artist and a success bool
 */
export const fetchArtistInfo = async (artist) => {
  let url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=039f408b5ec46293e3f253e7f174e138&format=json`;
  try {
    let artistInfo = await axios.get(url);
    return { success: true, artistInfo };
  } catch (error) {
    return { success: false, location: "fetchArtistInfo", error: error.message };
  }
};
