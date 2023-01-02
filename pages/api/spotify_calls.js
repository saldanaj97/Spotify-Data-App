import axios from "axios";
import { check } from "prettier";

/**
 * Fetches the users top 20 played songs
 * @param  {string} timePeriod string consisting of the time period we need data for
 * @return object containing information about the users top played songs
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
    return data;
  } catch (error) {
    return { message: "fetchTopArtists failed", error: error };
  }
};

/**
 * Fetches the users top 20 artists
 * @param  {string} timePeriod string consisting of the time period we need data for
 * @return object containing information about the users top artists
 */
export const fetchTopArtists = async (timePeriod) => {
  const TOKEN = window.localStorage.getItem("token");
  try {
    if (!TOKEN) {
      throw error("No user api token found");
    }
    let { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        time_range: timePeriod,
      },
    });
    return data;
  } catch (error) {
    return { message: "fetchTopArtists failed", error: error };
  }
};
