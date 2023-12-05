require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/property");
var cors = require("cors");
// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/", authRoutes);
app.use("/api", propertyRoutes);
// connnection
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
