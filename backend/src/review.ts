
import { usersCollection, reviewsCollection} from './dbInterface';
import { Review } from './types';

export async function addReview(userId: string, review: Review ) {

    const foundUser = await usersCollection.findOne( {username: userId});
    if (!foundUser) {
        throw new Error ("No user with this userId");
    }

    // Insert review document
    const res = await reviewsCollection.insertOne({
        ownerId: userId,
        album: review.album,
        rating: review.rating,
        creationDate: Date.now()
    })

    // Append objectId into the reviews array in the user object
    await usersCollection.updateOne(
        { _id: foundUser._id},
        { $push: {reviews: res.insertedId}}
    )

}

export async function getFriendsReviews(userId: string ) {
    const foundUser = await usersCollection.findOne( {username: userId});
    if (!foundUser) {
        throw new Error ("No user with this userId");
    }

    // Get a list of reviews by friends
    const reviewList = await reviewsCollection
        .find( {ownerId: {$in: foundUser.friends}})
        .sort({ creationDate: -1 }) // Most recent first
        .limit(10)
        .toArray()

    return reviewList;
}

export async function getMyReviews(userId: string ) {
    const foundUser = await usersCollection.findOne( {username: userId});
    if (!foundUser) {
        throw new Error ("No user with this userId");
    }

    // Get a list of reviews by friends
    const reviewList = await reviewsCollection.find( {ownerId: userId}).sort({ creationDate: -1 }).toArray() // Most recent first.toArray();

    return reviewList;
}