import axios from './axiosInstance';

/**
 * POST /user/friends/add
 * Adds a friend by their user ID.
 * @param {string} friendId
 */
export const addFriend = async (friendId: string) => {
    return axios.post('/user/friends/add', { friendId });
};

/**
 * GET /user/friends/
 * Retrieves the current user's list of friends.
 */
export const getFriends = async () => {
    const res = await axios.get('/user/friends/');
    return res.data.friendList;
};

// Remove a friend (unfollow)
export const removeFriend = async (friendId: string) => {
    const response = await axios.delete(`/user/friends/remove/${friendId}`);
    return response.data;
  };

// Check if logged-in user follows a given user
export const isUserFollowed = async (targetUserId: string): Promise<boolean> => {
    const response = await axios.get(`user/friends/isfollowing/${targetUserId}`);
    return response.data.isFollowed;
  };