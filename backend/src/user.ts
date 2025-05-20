import { usersCollection } from './dbInterface';
import { User } from './types';
import bcrypt from 'bcryptjs';

export async function registerUser(username: string, password: string) {
    const foundUser = await usersCollection.findOne( {username: username} );
    if (foundUser) {
        throw new Error ("User with this name exists");
    }
    // Insert user document
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({
        username: username,
        password: hashedPassword,
        topAlbums: [],
        reviews: [],
        friends: [],
    })

    if (!result) {
        throw new Error ("Error inserting into mongodb database");
    }

}


export async function authenticateUser(username: string, password: string) {
    const foundUser = await usersCollection.findOne( {username: username} );
    console.log(foundUser);
    if (!foundUser) {
        throw new Error ("No user with this name");
    }

    if (!(await bcrypt.compare(password, foundUser.password))) {
        throw new Error ("Invalid password");
    }
}