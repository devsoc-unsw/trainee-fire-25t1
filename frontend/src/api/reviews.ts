import axios from './axiosInstance';

/**
 * POST /review/add
 * Adds a new review for the currently logged-in user.
 * Backend gets userId from verifyJWT middleware (via res.locals).
 */
export const addReview = async (album: string, artist: string, coverImage: string, rating: number) => {
  return axios.post('/review/add', {
    album,
    artist,
    rating,
    coverImage
  });
};

/**
 * GET /user/reviews/:user
 * Retrieves recent reviews by friends of a given user.
 * @param {string} userId
 */
export const getUserReviews = async (userId: string) => {
  const res = await axios.get(`/user/reviews/${userId}`);
  return res.data.reviews;
};


/**
 * GET /friends/reviews
 * Retrieves recent reviews by friends of a given user.
 */
export const getFriendsReviews = async () => {
  const res = await axios.get(`/friends/reviews`);
  return res.data.reviews;
};