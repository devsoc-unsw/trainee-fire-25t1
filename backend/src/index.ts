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
    const username = req.body.user;
    const password = req.body.password;
    const user = { name: username };
    // User Authentication Here!!

    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);
    // Add refresh token to db!
});

app.post('/user/logout', (req: Request, res: Response) => {
   const tokenToRemove = req.body.token;
    // Remove refresh token from db! 
});

// Get new access token
app.post('/token', (req: Request, res: Response) => {
    const tokenToRemove = req.body.token;
    // Remove refresh token from db! 

    const refreshToken = req.body.token;
    // if (refreshToken == null) return res.sendStatus(401);
    // If refresh token not in db: return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error, user: User) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user);
        res.json({ accessToken: accessToken });
    });
});

// Verify access token middleware
function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: Error, user: User) => {
            if (err) return res.sendStatus(403);
            // req.body.user = user.username; --> why?
            next();
        }
    );
}

// Helper Functions
const generateAccessToken = (user: User) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
}

const generateRefreshToken = (user: User) => {
    return jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
}
