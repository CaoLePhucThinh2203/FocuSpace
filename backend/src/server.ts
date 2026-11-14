import * as Sentry from "@sentry/node";
import { config } from "./config";

if (config.sentryDsn) Sentry.init({ dsn: config.sentryDsn, sendDefaultPii: false, tracesSampleRate: 0 });

const { createApp } = await import("./app");
const { prisma } = await import("./lib/prisma");

const app = await createApp({ db: prisma });
if (config.sentryDsn) Sentry.setupExpressErrorHandler(app);
app.listen(config.port, () => console.log(`FocuSpace API chạy tại http://localhost:${config.port}/api/v1`));
