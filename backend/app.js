const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app
  .get("/", (req, res) => {
    res.send("Hello world");
  })
  .listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
  });

app.use("/register", require("./auth/register"));
app.use("/login", require("./auth/login"));
app.use("/show", require("./auth/showUser"));
app.use("/projects/new", require("./project/newProject"));
