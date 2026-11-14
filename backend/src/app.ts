import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import type { Db } from "./lib/prisma";
import { config } from "./config";
import { apiRouter } from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error";

/** Tạo app Express; nhận db để test được (Kiến trúc §3.2). */
export async function createApp({ db }: { db: Db }) {
  const app = express();
  app.set("trust proxy", 1);
  if (!config.isTest) app.use(pinoHttp());
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json({ limit: "256kb" }));
  app.use(cookieParser());
  app.use("/api/v1", await apiRouter(db));
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
