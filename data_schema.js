const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  user: {
    name: { type: String }, //name of user
    screen_name: { type: String }, //username of user
    user_id: { type: Number }, //user_id, already unique no need to put a check on it
    url: String,
    followers_count: Number, //number of followers of user
    favourite_count: Number, //number of times a user has liked the tweet
    statuses_count: Number,
    friends_count: Number, //Total number of friends a user has
    user_lang: String // preffered language selected by the user
  },
  entities: [
    {
      hashtags: [{ text: String }],
      user_mentions: [
        // consist of username and screen_name of other user mentioned
        {
          // by user in a particular tweet
          screen_name: String,
          name: String
        }
      ],
      urls: [{ expanded_url: String }] // url's included in the tweet
    }
  ],
  tweet_text: { type: String }, // tweet text
  tweet_id: { type: Number, unique: true }, // tweet_id, set to unique because each tweet is unique...the one which are retweeted are also unique
  created_at: Date, // date on which tweet was created
  retweet_count: { type: Number }, // number of times tweet has been retweeted
  tweet_favorite_count: { type: Number }, //number of times tweet has been liked (count 1 for a particular user)
  tweet_language: { type: String } //language in which the tweet is written
});

module.exports = mongoose.model("Twitter", DataSchema);
