const Twit = require("twit");
const config = require("./config");
const moment = require("moment");
let Data_Schema = require("./data_schema");
let tw_stream = require("express");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/twitterstream",
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to the database");
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //complex algo for parsing

// "query format: localhost:3000/twitter_stream?keyword=Modi&option=1"
app.get("/twitter_stream", async (req, res) => {
  await twitter_stream(req.query.keyword, req.query.option);
  res.send("data saved");
});

getHashtags = element => {
  // get hashtags from entities
  let hashtag = [];
  element.entities.hashtags !== []
    ? element.entities.hashtags.forEach(e => {
        hashtag.push({ text: e.text });
      })
    : [];
  return hashtag;
};

getUserMentions = element => {
  // get user_metions from entities
  let user_mention = [];
  element.entities.user_mentions !== []
    ? element.entities.user_mentions.forEach(e => {
        user_mention.push({
          name: e.name,
          screen_name: e.screen_name
        });
      })
    : [];
  return user_mention;
};

getUrl = element => {
  // get url from entities
  let url = [];
  element.entities.urls !== []
    ? element.entities.urls.forEach(e => {
        url.push({ expanded_url: e.expanded_url });
      })
    : [];
  return url;
};

get_Text = tweet => {
  let text = tweet.retweeted_status
    ? tweet.retweeted_status.text
    : tweet.extended_tweet === undefined
      ? tweet.text
      : tweet.extended_tweet.full_text;
  return text;
};

object_creation = async e => {
  let txt = await get_Text(e);
  let txt_u = txt.replace(/(\r\n\t|\n|\r\t)/gm, "");
  let obj = {
    created_at: e.created_at,
    tweet_id: e.id,
    user: {
      name: e.user.name,
      screen_name: e.user.screen_name,
      user_id: e.user.id,
      url: e.user.url,
      followers_count: e.user.followers_count,
      favourite_count: e.user.favourite_count,
      statuses_count: e.user.statuses_count,
      friends_count: e.user.friends_count,
      user_lang: e.user.lang
    },
    entities: [
      {
        hashtags: await getHashtags(e),
        user_mentions: await getUserMentions(e),
        urls: await getUrl(e)
      }
    ],
    tweet_text: txt_u,
    retweet_count: e.retweet_count,
    tweet_favorite_count: e.favorite_count,
    tweet_language: e.lang
  };
  return obj;
};

async function twitter_stream(keyword, option) {
  let T = new Twit(config);
  let stream = await T.stream("statuses/filter", {
    track: "#" + keyword
  });
  count = 0;
  stream.on("tweet", async tweet => {
    if (option === 0) {
      stream.stop();
      console.log("stopped");
      return;
    } else if (option === 1) {
      console.log(tweet.created_at);
      let txt = await get_Text(tweet);
      let tweet_obj = await object_creation(tweet, txt);
      // console.log(tweet);
      Data_Schema.findOneAndUpdate(
        { tweet_id: tweet.id },
        tweet_obj,
        { new: true, upsert: true },
        (err, doc) => {
          if (err) console.log(err);
          else console.log("saved");
        }
      );
      // let tweet_data_obj = new Data_Schema(tweet_obj);
      // tweet_data_obj.save((err, data) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("saved succesfully");
      //   }
      // });
    }
  });
}
