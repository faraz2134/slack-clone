import express from "express"; 
import { ENV } from "./config/env.js";
const app = express(); // Creates an instance of the Express application


app.get("/", (req, res) => {
  res.send("Hello World! 123"); // Handles GET requests to the root path and sends "Hello World! 123" as a response
});

console.log("mongo uri:", ENV.MONGO_URI); // Logs the MongoDB URI from environment variables (though not used in this snippet)

app.listen(ENV.PORT, () => console.log("Server started on port:",ENV.PORT)); // Starts the server and listens for connections on the specified PORT