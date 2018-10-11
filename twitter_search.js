const readline = require("readline-sync");
const Twit = require("twit");
// const mongoose = require("mongoose");
const config = require("./config");
let router = require("express").Router();
const Data_Schema = require("./data_schema");

// #format of query -> q=Mark&count=3&date=2018-10-09
//  req.query-object -> {q:'Mark',count:3,date:'2018-10-09}

router.get("/", (req, res) => {
  res.send("API_1");
});

//query-format eg.=> /api_1/get_data?q=Elonmusk&date=2018-10-09&count=10
router.get("/get_data", async (req, res) => {
  let params = {
    q: `#${req.query.q} since:${req.query.date}`,
    count: req.query.count
  };
  await Twitter_Search(params);
  res.send("data stored to database");
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

object_creation = async e => {
  // creation of tweet_object
  let txt_u = e.text.replace(/(\r\n\t|\n|\r\t)/gm, "");
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

async function Twitter_Search(params) {
  let T = new Twit(config);
  T.get("search/tweets", params, (err, data, response) => {
    if (err) {
      console.log(err);
    } else {
      data.statuses.map(async e => {
        let tweet_obj = await object_creation(e);
        let tweet_info = await new Data_Schema(tweet_obj);
        console.log(tweet_info);
        await tweet_info.save(function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("done");
          }
        });
      });
    }
  });
}

module.exports = router;
