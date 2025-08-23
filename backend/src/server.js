import express from "express"; 
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
const app = express(); // Creates an instance of the Express application


app.get("/", (req, res) => {
  res.send("Hello World! 123"); // Handles GET requests to the root path and sends "Hello World! 123" as a response
});


app.listen(ENV.PORT, () => {
  console.log("Server started on port:")
    connectDB();

}); // Starts the server and listens for connections on the specified PORT