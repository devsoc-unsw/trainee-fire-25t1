import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { addReview, getReviews } from './review';
import { registerUser, authenticateUser } from './user';
import { Review, User, Album } from './types';

import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import express,{ json, Request, Response, NextFunction } from 'express';
const app = express();

import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { register } from 'module';
import { ObjectId } from 'mongodb';
import { addFriend, getFriends } from './friends';
const swaggerDocument = YAML.load('openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cookieParser());

app.post('/auth/login', async (req: Request, res: Response): Promise<any> => {
  // !!User Authentication Here!!
  const { username, password } = req.body;

  try {
    await authenticateUser(username, password)
  }
  catch (e: any) {
    return res.status(403).json({ error: e });
  }

  const accessToken = generateAccessToken(username);
  const refreshToken = generateRefreshToken(username);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // this means we cant see token on inspect element
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

app.post('/auth/register', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    await registerUser(username, password)
  } catch (e: any) {
    return res.status(403).json({ error: e });
  }

  const accessToken = generateAccessToken(username);
  const refreshToken = generateRefreshToken(username);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // this means we cant see token on inspect element
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ accessToken });
});

// verifyJWT should check tokens and pass userId to req??? - not sure
app.post('/review/add', verifyJWT, async (req: Request, res: Response): Promise<any> => {
  // Obtain userId or username from verifyJWT
  const userId = res.locals.user;
  // const review = req.body;
  // if (!review) {
  //   return res.status(400).json({ error: "No review detected." });
  // }
  const review : Review = {
    _id: new ObjectId(),
    ownerId: userId,
    album: {
      name: req.body.album,
      artist: req.body.artist,
    },
    rating: req.body.rating,
    creationDate: Date.now()
  }
  try {
    await addReview(userId, review)
    return res.status(200).json({ message: "Review added successfully" });
  }
  catch (e: any) {
    return res.status(403).json({ error: "Error occured while adding review" });
  }
});


app.get('users/reviews/:user', verifyJWT, async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.user as string;
  try {
    // retrieve 10 most recent reviews left by friends of the user.
    const reviews = await getReviews(userId)
    return res.status(200).json({ reviews: reviews });
  }
  catch (e: any) {
    return res.status(403).json({ error: "Errors occur while retrieving reviews" });
  }
});



//Add a friend (following someone, to be exact)
app.post('/user/friends/add', verifyJWT, async (req: Request, res: Response): Promise<any> => {
  // Obtain userId or username from verifyJWT
  const userId = res.locals.user;
  

  // Do not see inputs route list (google doc); assume the 'friend' Id added is from req.body 
  const friendId = req.body.friendId;
  try {
    addFriend(userId, friendId); 
    return res.status(200).json({
         message: "Friend added successfully"
    });
  }
  catch (e: any) {
    return res.status(403).json({ error: e.message });
  }
});

//Get a list of friends
app.get('/user/friends/list', verifyJWT, async (req: Request, res: Response): Promise<any> => {
  const userId = res.locals.user;
  try {
    const friendList = await getFriends(userId); 
    return res.status(200).json({ friendList: friendList});
  }
  catch (e: any) {
    return res.status(403).json({ error: "Errors occur while retrieving friend list" });
  }
});



// Auth middleware
function verifyJWT(req: Request, res: Response, next: NextFunction) :any {
  const authHeader = req.headers['authorization'];
  const refreshToken = req.cookies.refreshToken;

  if (!authHeader) {
    return res.status(401).json({ error: "No access token given" });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as { userId: string };
    res.locals.user = payload.userId;
    next();
  } catch (err) {
    try {
      const refreshPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as { userId: string };
      const newToken = generateAccessToken(refreshPayload.userId);
      res.set('accessToken', newToken);
      req.body.userId = refreshPayload.userId;
      return next();
    } catch (err2) {
      return res.status(403).json({ error: "Invalid token(s)" });
    }
  }
}

// Auth Helper Functions
const generateAccessToken = (userId: string) => {
    return jwt.sign(
      { userId: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
}

const generateRefreshToken = (userId: string) => {
    return jwt.sign(
      { userId: userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
}

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
