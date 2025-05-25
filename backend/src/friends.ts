
import { usersCollection } from './dbInterface';

export async function addFriend (userId: string, friendId: string) {
    const foundUser = await usersCollection.findOne( {username: userId} );
    if (!foundUser) {
        throw new Error ("User with this name does not exist");
    }
    // Check for errors
    if (friendId === userId) {
        throw new Error ("Friend Id needs to be different from your Id");
    }
    const foundFriend = await usersCollection.findOne( {username: friendId} );
    if (!foundFriend) {
        throw new Error ("The user with this Id does not exist");
    }

    // push friendId to the user object in the collection
    await usersCollection.updateOne(
        { _id: foundUser._id},
        { $push: {friends: friendId}}
    )
}

export async function removeFriend (userId: string, friendId: string) {
    const foundUser = await usersCollection.findOne( {username: userId} );
    if (!foundUser) {
        throw new Error ("User with this name does not exist");
    }
    // Check for errors
    if (friendId === userId) {
        throw new Error ("Friend Id needs to be different from your Id");
    }
    const foundFriend = await usersCollection.findOne( {username: friendId} );
    if (!foundFriend) {
        throw new Error ("The user with this Id does not exist");
    }

    // push friendId to the user object in the collection
    await usersCollection.updateOne(
        { _id: foundUser._id},
        { $pull: {friends: friendId}}
    )
}



export async function getFriends (userId: string): Promise<Array<string>> {
    const foundUser = await usersCollection.findOne( {username: userId} );
    if (!foundUser) {
        throw new Error ("User with this name does not exist");
    }

    const friendList = foundUser.friends;

    return friendList;
}

export const checkIfFollowing = async (userId: string, friendId: string): Promise<boolean> => {
  const user = await usersCollection.findOne({username: userId});
  if (!user) throw new Error('User not found');
  return user.friends.includes(friendId); // or `following`, depending on your schema
};
