import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express(); // Creates an instance of the Express application

app.use(express.json());

// 👇 Clerk Middleware with secret key (no publishable key required in backend)
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Set up the "/api/inngest" routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// Public route (no auth needed)
app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

// 👇 Add this so favicon.ico requests don’t break
app.get("/favicon.ico", (req, res) => res.status(204).end());

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
