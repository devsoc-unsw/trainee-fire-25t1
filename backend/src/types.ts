import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    userId: string;
    username: string;
    password: string;
    topAlbums: [Album];
    reviews: [ObjectId]; 
    friends: [string]; //list of userIds

};

export interface Album {
    name: string; 
    artist: string; 
    coverImage?: string;  
}

export interface Review {
    _id: ObjectId;
    ownerId: string; 
    album: Album;
    rating: string; 
    creationDate: number; 
};