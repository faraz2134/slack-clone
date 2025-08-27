import "../instrument.mjs"; // Import this first for Sentry
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.routes.js";

import * as Sentry from "@sentry/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.use(clerkMiddleware());

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

app.get("/protected", (req, res) => {
  res.send("You are authenticated ✅");
});

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server is starting on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
export default app;
