import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import * as Sentry from "@sentry/node";
import type { Db } from "./lib/prisma";
import { config } from "./config";
import { apiRouter } from "./routes";
import { errorHandler, notFoundHandler, shouldReportError } from "./middleware/error";

/** Tạo app Express; nhận db để test được (Kiến trúc §3.2). */
export async function createApp({ db }: { db: Db }) {
  const app = express();
  app.set("trust proxy", 1);
  // Log gọn: không ghi header, cookie, token (PRD BR-13).
  if (!config.isTest)
    app.use(pinoHttp({
      serializers: {
        req: (r: { method: string; url: string }) => ({ method: r.method, url: r.url }),
        res: (r: { statusCode: number }) => ({ statusCode: r.statusCode }),
      },
    }));
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json({ limit: "256kb" }));
  app.use(cookieParser());
  app.use("/api/v1", await apiRouter(db));
  // Sentry phải đứng trước errorHandler, vì errorHandler trả response và không gọi next (#161).
  if (config.sentryDsn) Sentry.setupExpressErrorHandler(app, { shouldHandleError: shouldReportError });
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
