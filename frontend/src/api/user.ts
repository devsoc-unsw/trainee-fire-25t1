import axios from './axiosInstance';

/**
 * GET /user/:user
 * Retrieves profile data for a given user.
 * Includes: username, topAlbums, reviews, friends, and loggedIn check.
 * @param {string} userId
 */
export const getUserInfo = async (userId?: string) => {
  const id = userId === undefined ? "" : userId
  const res = await axios.get(`/user/${id}`);
  return res.data;
};
