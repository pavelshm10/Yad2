"use strict";
const express = require("express");
const routes = require("./api/routes");
const app = express();
var router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = 3000;
const path = require("path");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
app.use("/", routes);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname) + "/public"));
// app.use(express.static("build"));

// }

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port `, port);
});
