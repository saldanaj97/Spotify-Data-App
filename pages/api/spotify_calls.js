import axios from "axios";

/**
 * Utility function that is used to check if a user auth token is available for use
 * @param  {string} token the user auth token (can be empty or contain a token)
 * @error throws an error if no token is found
 */
const checkForUserAuthToken = (token) => {
  if (!token) {
    throw error("User has not authenticated their login");
  }
};

/**
 * Fetches info about the logged in users account based on authd permissions
 * @param  {none}
 * @return object containing information about the logged in user
 */
export const fetchUserInfo = async () => {
  const TOKEN = window.sessionStorage.getItem("spotify-token");
  try {
    checkForUserAuthToken(TOKEN);
    let { data } = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, location: "fetchTopSongs", error: error.message };
  }
};

/**
 * Fetches the users top 20 played songs
 * @param  {string} timePeriod string consisting of the time period we need data for
 * @return object containing information about the users top played songs as well as a success bool
 */
export const fetchTopSongs = async (timePeriod) => {
  // The users auth token
  const TOKEN = window.sessionStorage.getItem("spotify-token");
  try {
    checkForUserAuthToken(TOKEN);
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
  const TOKEN = window.sessionStorage.getItem("spotify-token");
  try {
    checkForUserAuthToken(TOKEN);
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

/**
 * Fetches the artists top 5 songs and recent albums
 * @param  {string} artistID string consisting of the artists spotify id
 * @return object containing information about the artists discography
 */
export const fetchArtistDiscography = async (artistID) => {
  const TOKEN = window.sessionStorage.getItem("spotify-token");
  try {
    checkForUserAuthToken(TOKEN);

    // Get the users country code since the market param is required for artists top tracks
    let { country } = await fetchUserInfo().then((response) => response.data);

    // Carry out the request
    let { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        market: country,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, location: "fetchArtistDiscography", error: error.message };
  }
};

/**
 * Fetches the related artists based on the artist being viewed
 * @param  {string} artistID string consisting of the  artists spotify id
 * @return object containing related artists and info about them
 */
export const fetchRelatedArtists = async (artistID) => {
  const TOKEN = window.sessionStorage.getItem("spotify-token");
  try {
    checkForUserAuthToken(TOKEN);
    let { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/related-artists`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, location: "fetchRelatedArtists", error: error.message };
  }
};
