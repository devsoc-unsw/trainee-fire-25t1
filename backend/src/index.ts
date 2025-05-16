import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

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
const swaggerDocument = YAML.load('openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cookieParser());

// Our beautiful temporary database
const users: { [username: string]: { password: string } } = {};

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/auth/login', async (req: Request, res: Response): Promise<any> => {
  // !!User Authentication Here!!
  const { username, password } = req.body;

  const user = users[username];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
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

  if (users[username]) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };

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

// Auth middleware
function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const refreshToken = req.cookies.refreshToken;

  if (!authHeader) {
    return res.status(401).json({ error: "No access token given" });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as { userId: string };
    req.body.userId = payload.userId;
    return next();
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
