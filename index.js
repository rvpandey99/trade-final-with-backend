//inport packages
const express = require("express");
const normalizePort = require("normalize-port");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
require("dotenv/config");

const app = express();

//global middlewares
app.use(cors());
app.use(bodyParser.json());

//import models

//import routes
const register = require("./routes/auth");
const stock = require("./routes/stock");
const order = require("./routes/order");

//use route specific middlewares
app.use("/api/", register);
app.use("/api/", stock.router);
app.use("/api/", order);
app.use(express.static(path.join(__dirname, "dist/final")));
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

app.get("*", (req, res) => {
  res.set("X-Content-Type-Options", "sniff");
  return res.sendFile(path.join(__dirname, "/dist/final/index.html"));
});
//connect to mongodb
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true }, err => {
  if (!err) {
    console.log("Connected to DB");
  } else {
    console.log(err);
  }
});
//create routes
stock.createStocks();
//resolve the port
var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

//start the server
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is listening on port ${port}`);
  }
});
