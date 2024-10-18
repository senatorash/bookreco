const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

// global middleware configuration to receive JSON data from client
app.use(express.json());

// global middleware configuration for cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000", "https://bookreco.vercel.app"],
    credentials: true,
  })
);

// global middleware configuration for cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Server is Live!" });
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

module.exports = app;
