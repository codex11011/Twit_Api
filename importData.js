const fs = require("fs");
const moment = require("moment");
const mdq = require("mongo-date-query");
const json2csv = require("json2csv").parse;
const path = require("path");
const fields = [
  "user.name",
  "user.screen_name",
  "created_at",
  "retweet_count",
  "tweet_favorite_count"
];

function saveFilteredData(docs) {
  let csv;
  try {
    csv = json2csv(docs, { fields });
  } catch (err) {
    console.log(err);
  }
  const dateTime = moment().format("YYYYMMDDhhmmss");
  const filePath = path.join(
    __dirname,
    ".",
    "exports",
    "csv-" + dateTime + ".csv"
  );
  fs.writeFile(filePath, csv, function(err) {
    if (err) {
      console.log(err);
    } else {
      setTimeout(function() {
        fs.unlinkSync(filePath); // delete this file after 30 seconds
      }, 30000);
      console.log("/exports/csv-" + dateTime + ".csv");
    }
  });
}
module.exports = saveFilteredData;
