import express,{ json, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: "src/.env" });
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/auth/login', (req: Request, res: Response) => {
    // !!User Authentication Here!!
    const userId = req.body.message;

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: accessToken });
});

// Auth middleware
function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ error: "No access token given" });
    return;
  }

  const accessToken = authHeader.split(' ')[1];
  const refreshToken = req.cookies.refreshToken;

  // First verify access token
  try {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err: Error, userId: string) => {
        if (err) {
          try {
            // Verify refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error, userId: string) => {
              if (err) {
                const errorMessage = "Invalid refresh token";
                throw new Error(errorMessage);
              } else {
                const newToken = generateAccessToken(userId);
                res.set('accessToken', newToken);
                return;
              }
            });
          } catch (Error) {
            throw Error;
          }
        } else {
          req.body.userId = userId;
        }
      }
    );
  } catch (Error) {
    return;
  }
  next();
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

