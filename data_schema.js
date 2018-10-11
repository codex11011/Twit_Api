const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  user: {
    name: { type: String }, //name of user
    screen_name: { type: String }, //username of user
    user_id: { type: Number, unique: true }, //user_id
    url: String,
    followers_count: Number,
    favourite_count: Number,
    statuses_count: Number,
    friends_count: Number,
    user_lang: String
  },
  entities: [
    {
      hashtags: [{ text: String }],
      user_mentions: [
        {
          screen_name: String,
          name: String
        }
      ],
      urls: [{ expanded_url: String }]
    }
  ],
  tweet_text: { type: String },
  tweet_id: { type: Number },
  created_at: Date,
  retweet_count: { type: Number },
  tweet_favorite_count: { type: Number },
  tweet_language: { type: String }
});

module.exports = mongoose.model("Twitter", DataSchema);
