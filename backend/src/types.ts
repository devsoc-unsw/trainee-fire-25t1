import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    userId: string;
    username: string;
    password: string;
};

export interface Review {
    _id: ObjectId;
};