import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";

// For ES modules (to use __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

// 👇 Clerk Middleware with secret key
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Set up the "/api/inngest" routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// Public route
app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

// Example protected route
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
