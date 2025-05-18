
import { usersCollection, reviewsCollection} from './dbInterface';
import { Review } from './types';

export async function addReview(userId: string, review: Review ) {
    
    const foundUser = usersCollection.findOne( {username: userId}); 
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

    //Append objectId into the reviews array in the user object
    await usersCollection.updateOne( 
        { _id: foundUser._id},
        { $push: {reviews: res.insertedId}}
    )

    
}


export async function getReviews(userId: string ) {
    const foundUser = await usersCollection.findOne( {username: userId}); 
    if (!foundUser) {
        throw new Error ("No user with this userId"); 
    }

    // Get a list of reviews by friends
    const reviewList = await reviewsCollection.find( {ownerId: {$in: foundUser.friends}}); 


    // The last 10 element should be the most 10 recent since we append to the end as more review is added.
    return reviewList.slice(-10); 
}