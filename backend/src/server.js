import express from "express"; 
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
const app = express(); // Creates an instance of the Express application

app.use(clerkMiddleware())
app.use(express.json());
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Hello World! 123"); // Handles GET requests to the root path and sends "Hello World! 123" as a response
});



const startServer = async () => {
  try{
    await connectDB();
    if(ENV.NODE_ENV!=="production"){
      app .listen(ENV.PORT, () => {
        console.log("Server is starting on port:" ,ENV.PORT);
      });
    }
  }catch(error){
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
startServer();
export default app;