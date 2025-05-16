const { MongoClient, ServerApiVersion } = require('mongodb');
import dotenv from "dotenv";
import { Review, User } from './types.ts'

dotenv.config({ path: "src/.env" });
const uri: string | undefined = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db("jukeboxd");
const usersCollection = db.collection('users');

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const collections = await db.listCollections().toArray()
    console.log(collections);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// insert new document to a collection (reviews or users)
export async function authRegister(
  username: string,
  password: string
) {
  try {
    await client.connect();
    await usersCollection.insertOne({
      username: username,
      password: password,
      topAlbums: [],
      reviews: [],
      friends: []
    });  // insert data in collection
  } catch (error) {
    console.error("setting data failed", error);
  }
}


authRegister('ben', 'password').catch(console.dir);
