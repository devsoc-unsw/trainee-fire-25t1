import express,{ json, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { User } from './types';

dotenv.config();
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/user/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    // User Authentication Here!!
    const userId = "insertuserIdHere!";

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    // Add refresh token to db!
    res.json({accessToken: accessToken, refreshToken: refreshToken});
});

app.post('/user/logout', (req: Request, res: Response) => {
   const tokenToRemove = req.body.token;
    // Remove refresh token from db! 
});

// Auth middleware
function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  // Access token
  const accessToken = authHeader.split(' ')[1];
  const refreshToken = req.body.refreshToken;

  // First verify access token
  jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err: Error, userId: string) => {
          if (err) {
            // Verify refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error, userId: string) => {
              if (err) return res.sendStatus(403);

              const newToken = generateAccessToken(userId);
              // How to set new access token on user side??
            });
          }
          req.body.userId = userId;
          next();
      }
  );
  next();
}

// Helper Functions
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
      { expiresIn: '1d' }
    );
}
