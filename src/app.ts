import express, { type Express, type Request, type Response, type RequestHandler } from "express";
import cors, { type CorsOptionsDelegate } from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";

const app: Express = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
].filter(Boolean) as string[];

const corsOptionsDelegate: CorsOptionsDelegate<Request> = (req, callback) => {
  const origin = req.headers.origin;

  // Allow requests with no origin (like Postman or Server-to-Server)
  if (!origin) {
    return callback(null, { origin: true, credentials: true });
  }

  callback(null, {
    origin: allowedOrigins.includes(origin) ? origin : false,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
};

app.use(cors(corsOptionsDelegate));
app.use(helmet());
app.use(compression() as RequestHandler);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Project Submission & Review API",
    version: "1.0.0",
  });
});

app.use("/api/v1", apiRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;