
export interface User {
    username: string;
    password: string;
    topAlbums: [Album];
    reviews: [string];
    friends: [string]; //list of userIds
    loggedIn?: boolean
};

export interface Album {
    name: string;
    artist: string;
    coverImage?: string;
}

export interface Review {
    ownerId: string;
    album: Album;
    rating: string;
    creationDate: number;
};