import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-chi-dung-tren-may-ca-nhan",
  corsOrigin: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(","),
  cookieSecure: process.env.COOKIE_SECURE === "true",
  sentryDsn: process.env.SENTRY_DSN ?? "",
  accessTtlSec: 15 * 60,
  refreshTtlDays: 30,
  isTest: process.env.NODE_ENV === "test",
};
