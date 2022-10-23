"use strict";
const express = require("express");
const routes = require("./api/routes");
const app = express();
var router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const path= require('path')
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/", routes);

// if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname)+"/public"));
  // app.use(express.static("build"));
  app.get('*',(req,res)=>{
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  })
// }

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port `, port);
});
