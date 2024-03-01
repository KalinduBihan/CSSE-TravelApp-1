import express from "express";
import { connect } from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace the connection string with your MongoDB Atlas URL)
connect(
  "mongodb+srv://kalindu:20011002@cluster0.nry6a0z.mongodb.net/Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define and use your routes and middleware here
// Example:
app.get("/", (req, res) => {
  res.send("Hello from your Express.js server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
