const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const engine = require("ejs-mate");
let app = express();

run();
async function run() {
  await mongoose.connect(
    "mongodb://localhost:27017/twittersearch",
    { useNewUrlParser: true },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("connected to the database");
      }
    }
  );
}

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //complex algo for parsing
app.engine("ejs", engine);
app.set("view engine", "ejs");

let twitter_search_route = require("./twitter_search");
let filter_tweet_route = require("./filter");
// let import_data_csv = require("./importData");

app.use("/api_1", twitter_search_route); // # API_1
app.use("/api_2", filter_tweet_route); // # API_2
// app.use("/api_3", import_data_csv); // # API_3

app.listen(3000, function(err) {
  if (err) throw err;
  console.log("Server is running");
});
