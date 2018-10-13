// const mongoose = require("mongoose");
// const readlineSync = require("readline-sync");
const Twitter_Data = require("./data_schema");
const moment = require("moment");
let router = require("express").Router();
let import_data_csv = require("./importData");
//******************************************** */
/******************* NOTE *********************/
// if you want to save any data just add &save=1 to query
//example->
///  api_2/search/tweet_screenname/ew?name=Mark&page=0&limit=3&save=1
/********************************************** */
//Pagination
function saveData(req, docs) {
  let saveOption = parseInt(req.query.save) || 0;
  if (!isNaN(saveOption) && saveOption === 1) {
    import_data_csv(docs);
  }
}
//query-format eg:=> api_/page?page=0&limit=3
// page:number of the page we want to get
//limit:number of entities that can be displayed
function paginate(req, res, obj) {
  var pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  };
  if (!isNaN(pageOptions.page) && !isNaN(pageOptions.limit)) {
    Twitter_Data.find(obj)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .exec(function(err, doc) {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json(doc);
        saveData(req, doc);
      });
  } else {
    res.send("enter valid query");
  }
}

function paginate1(req, res, obj) {
  let Options = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  };
  if (!isNaN(Options.page) && !isNaN(Options.limit)) {
    Twitter_Data.find({})
      .sort(obj)
      .skip(Options.page * Options.limit)
      .limit(Options.limit)
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.send(data);
          saveData(req, data);
        }
      });
  } else {
    res.send("enter valid query");
  }
}

function paginate2(req, res, obj1, obj2) {
  let Options = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  };
  if (!isNaN(Options.page) && !isNaN(Options.limit)) {
    Twitter_Data.find(obj1, obj2)
      .skip(Options.page * Options.limit)
      .limit(Options.limit)
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.send(data);
          saveData(req, data);
        }
      });
  } else {
    res.send("enter valid query");
  }
}

//****************************************** */

router.get("/", (req, res) => {
  res.send("API_2");
});

//  query-format -> /api_2/all_tweets?page=0&limit=3
router.get("/all_tweets", (req, res) => {
  obj = {};
  paginate(req, res, obj);
});

/*******************************************/

//Screen_name

//exact match
// query-format -> /api_2/search/tweet_screen_name/ex?name=Mark&page=0&limit=3
router.get("/search/tweet_screen_name/ex", (req, res) => {
  obj = { "user.screen_name": req.query.name };
  paginate(req, res, obj);
});

//starts with
// query-format -> /api_2/search/tweet_screen_name/sw?name=Ja&page=0&limit=3
router.get("/search/tweet_screen_name/sw", (req, res) => {
  let regexp = new RegExp("^" + req.query.name);
  obj = { "user.screen_name": regexp };
  paginate(req, res, obj);
});

//ends with
// query-format -> /api_2/search/tweet_screen_name/ew?name=Mark&page=0&limit=3
router.get("/search/tweet_screen_name/ew", (req, res) => {
  let regexp = new RegExp(req.query.name + "$");
  obj = { "user.screen_name": regexp };
  paginate(req, res, obj);
});

/************************************************* */
//User_name

//exact match
// query-format -> /api_2/search/tweet_username/ex?name=Mark&page=0&limit=3
router.get("/search/tweet_username/ex", (req, res) => {
  obj = { "user.name": req.query.name };
  paginate(req, res, obj);
});

//starts with
// query-format -> /api_2/search/tweet_username/sw?name=Ja&page=0&limit=3
router.get("/search/tweet_username/sw", (req, res) => {
  let regexp = new RegExp("^" + req.query.name);
  obj = { "user.name": regexp };
  paginate(req, res, obj);
});

//ends with
// query-format -> /api_2/search/tweet_username/ew?name=Mark&page=0&limit=3
router.get("/search/tweet_username/ew", (req, res) => {
  let regexp = new RegExp(req.query.name + "$");
  obj = { "user.name": regexp };
  paginate(req, res, obj);
});

/******************************************* */
//Search Tweet Text

//contains
// query-format -> api_2/search/tweet_text/co?text=Breath&page=0&limit=2
router.get("/search/tweet_text/contains", (req, res) => {
  obj = { tweet_text: { $regex: `${req.query.text}`, $options: "i" } };
  paginate(req, res, obj);
});


//exact match
// query-format -> api_2/search/tweet_text/ex?text=Breath&page=0&limit=2
router.get("/search/tweet_text/ex", (req, res) => {
  obj = { tweet_text: req.query.text };
  paginate(req, res, obj);
});

//starts with
// query-format -> api_2/search/tweet_text/sw?text=Ja&page=0&limit=2
router.get("/search/tweet_text/sw", (req, res) => {
  let regexp = new RegExp("^" + req.query.text);
  obj = { tweet_text: regexp };
  paginate(req, res, obj);
});

//ends with
// query-format -> api_2/search/tweet_text/ew?text=Rt&page=0&limit=2
router.get("/search/tweet_text/ew", (req, res) => {
  var regexp = new RegExp(req.query.text + "$");
  obj = { tweet_text: regexp };
  paginate(req, res, obj);
});
/**************************************************************** */

//Sorting

// query-format -> api_2/sort_tweet/by_date?order=asc&page=0&limit=2
//order can take asc or desc
router.get("/sort_tweet/by_date", (req, res) => {
  obj = { created_at: req.query.order };
  paginate1(req, res, obj);
});

// query-format -> api_2/sort_tweet/by_rt_count?order=asc&page=0&limit=2
//order can take asc or desc
router.get("/sort_tweet/by_rt_count", (req, res) => {
  obj = { retweet_count: req.query.order };
  paginate1(req, res, obj);
});

//******************************************************** */

//************************************************** */

//Retweet_count

//give tweets with retweet_count greator than a value
// query-format -> /api_2/filter/rt_count/gt?value=250&page=0&limit=2
router.get("/filter/rt_count/gt", (req, res) => {
  obj = { retweet_count: { $gt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count less than a value
// query-format -> /api_2/filter/rt_count/lt?value=250&page=0&limit=2
router.get("/filter/rt_count/lt", (req, res) => {
  obj = { retweet_count: { $lt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count greator than or equal to a value
// query-format -> /api_2/filter/rt_count/gte?value=250&page=0&limit=2
router.get("/filter/rt_count/gte", (req, res) => {
  obj = { retweet_count: { $gte: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count less than or equal to a value
// query-format -> /api_2/filter/rt_count/lte?value=250&page=0&limit=2
router.get("/filter/rt_count/lte", (req, res) => {
  obj = { retweet_count: { $lte: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count in a particular range eg:- [250,400]
// query-format -> /api_2/filter/rt_count/range?value1=250&value2=400&page=0&limit=2s
router.get("/filter/rt_count/range", (req, res) => {
  let lte = Math.max(req.query.value1, req.query.value2);
  let gte = Math.min(req.query.value1, req.query.value2);
  obj = { retweet_count: { $gte: gte, $lte: lte } };
  paginate(req, res, obj);
});

//find all tweets with retweet_count with a particular value (exactMatch)
// query-format -> /api_2/filter/rt_count/exact?value=225&page=0&limit=2
router.get("/filter/rt_count/exact", (req, res) => {
  obj = { retweet_count: req.query.value };
  paginate(req, res, obj);
});

//****************************************** */

//Followers_count

//give tweets with user's followers_count greator than a value
// query-format -> /api_2/filter/fl_count/gte?value=250&page=0&limit=2
router.get("/filter/fl_count/gt", (req, res) => {
  obj = { "user.followers_count": { $gt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with user's followers_count less than a value
// query-format -> /api_2/filter/fl_count/lte?value=250&page=0&limit=2
router.get("/filter/fl_count/lt", (req, res) => {
  obj = { "user.followers_count": { $lt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with user's followers_count in a particular range eg:- [250,400]
// query-format -> /api_2/filter/fl_count/range?value1=250&value2=400&page=0&limit=2
router.get("/filter/fl_count/range", (req, res) => {
  let lte = Math.max(req.query.value1, req.query.value2);
  let gte = Math.min(req.query.value1, req.query.value2);
  obj = { "user.followers_count": { $gte: gte, $lte: lte } };
  paginate(req, res, obj);
});

//find all tweets with followers_count with a particular value (exactMatch)
// query-format -> /api_2/filter/fl_count/exact?value=225&page=0&limit=2
router.get("/filter/fl_count/exact", (req, res) => {
  obj = { "user.followers_count": req.query.value };
  paginate(req, res, obj);
});

//****************************************** */

//Favourite_count

//give tweets with favourite_count greator than a value
// query-format -> /api_2/filter/fv_count/gte?value=250&page=0&limit=2
router.get("/filter/fv_count/gt", (req, res) => {
  obj = { tweet_favourite_count: { $gt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with followers_count less than a value
// query-format -> /api_2/filter/fv_count/lt?value=250
router.get("/filter/fv_count/lt", (req, res) => {
  obj = { tweet_favourite_count: { $lt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with followers_count in a particular range eg:- [250,400]
// query-format -> /api_2/filter/fv_count/range?value1=250&value2=400&page=0&limit=2
router.get("/filter/fv_count/range", (req, res) => {
  let lte = Math.max(req.query.value1, req.query.value2);
  let gte = Math.min(req.query.value1, req.query.value2);
  obj = { tweet_favourite_count: { $gte: gte, $lte: lte } };
  paginate(req, res, obj);
});

//find all tweets with favourite_count with a particular value (exactMatch)
// query-format -> /api_2/filter/fv_count/exact?value=225&page=0&limit=2
router.get("/filter/fv_count/exact", (req, res) => {
  obj = { tweet_favourite_count: req.query.value };
  paginate(req, res, obj);
});

//****************************************** */

//Language
//find all tweets with a particular language code
// query-format -> /api_2/filter/lang/lang?q=en&page=0&limit=2
router.get("/filter/lang", (req, res) => {
  obj = { tweet_language: req.query.lang };
  paginate(req, res, obj);
});
// Name 	Language code
// English(default ) 	en
// Arabic 	ar
// Bengali 	bn
// Czech 	cs
// Danish 	da
// German 	de
// Greek 	el
// Spanish 	es
// Persian 	fa
// Finnish 	fi
// Filipino 	fil
// French 	fr
// Hebrew 	he
// Hindi 	hi
// Hungarian 	hu
// Indonesian 	id
// Italian 	it
// Japanese 	ja
// Korean 	ko
// Malay 	msa
// Dutch 	nl
// Norwegian 	no
// Polish 	pl
// Portuguese 	pt
// Romanian 	ro
// Russian 	ru
// Swedish 	sv
// Thai 	th
// Turkish 	tr
// Ukrainian 	uk
// Urdu 	ur
// Vietnamese 	vi
// Chinese(Simplified) 	zh - cn
// Chinese(Traditional) 	zh - tw

//****************************************** */

//Date range

send_data_date = (date2, date1, req, res) => {
  obj = { created_at: { $gte: date2, $lte: date1 } };
  paginate(req, res, obj);
};

date_Validation = req => {
  if (
    !moment(req.query.date1, "YYYY-MM-DD").isValid() &&
    !moment(req.query.date2, "YYYY-MM-DD").isValid()
  ) {
    return false;
  } else {
    return true;
  }
};
//find all tweets between a given range of dates eg:(2018-10-09,2018-10-10)
//query-format -> api_2//filter/date_range?date1=2018-10-09&date2=2018-10-15&page=0&limit=2
router.get("/filter/date_range", (req, res) => {
  if (!date_Validation(req)) {
    console.log("Invalid Date");
    res.send("Invalid Date");
    return;
  } else {
    console.log("Valid Date");
    let date1 = moment(req.query.date1).format();
    let date2 = moment(req.query.date2).format();
    if (moment(date1).isAfter(date2)) {
      send_data_date(date2, date1, res);
      console.log("date1 > date2");
    } else if (moment(date2).isAfter(date1)) {
      send_data_date(date1, date2, req, res);
      console.log("date1 < date2");
    }
  }
});

//************************************************ */

//Get Meta_Data

//get user name of all the tweets
// query-format -> /api_2/getData/name?&page=0&limit=2
router.get("/getdata/name", (req, res) => {
  obj1 = {};
  obj2 = { "user.name": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//get screen_name of all the tweets
// query-format -> /api_2/getData/screen_name?&page=0&limit=2
router.get("/getdata/screen_name", (req, res) => {
  obj1 = {};
  obj2 = { "user.screen_name": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//other user mentioned in the tweet by the owner of the tweet
//result contains username of the owner of the tweet and array
//of object of user refrenced
// query-format -> /api_2/filter/user_mentions?&page=0&limit=2
router.get("/getdata/user_mentions", (req, res) => {
  obj1 = {};
  obj2 = { "user.name": 1, "entities.user_mentions": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//Urls
//find all links in all the tweets
// query-format -> /api_2/getdata/urls?&page=0&limit=2
router.get("/getdata/urls", (req, res) => {
  obj1 = {};
  obj2 = { "entities.urls.expanded_url": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//search user_mentions > screen_name by starts with
//query-format->  api_2/filter/user_mentions/screen_name/sw?name=Mark&page=0&limit=2
//case-sensitive
router.get("/filter/user_mentions/screen_name/sw", (req, res) => {
  let regx = new RegExp("^" + req.query.name);
  obj1 = { "entities.user_mentions.screen_name": regx };
  obj2 = { "entities.user_mentions": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//search user_mentions > screen_name by ends with
//query-format->  api_2/filter/user_mentions/screen_name/ew?name=Mark&page=0&limit=2
//case-sensitive
router.get("/filter/user_mentions/screen_name/ew", (req, res) => {
  let regx = new RegExp(req.query.name + "$");
  obj1 = { "entities.user_mentions.screen_name": regx };
  obj2 = { "entities.user_mentions": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//search user_mentions > screen_name (exact match)
//query-format->  api_2/filter/user_mentions/screen_name/ex?name=Mark&page=0&limit=2
//case-sensitive
router.get("/filter/user_mentions/screen_name/ex", (req, res) => {
  let regx = new RegExp(req.query.name);
  obj1 = { "entities.user_mentions.screen_name": regx };
  obj2 = { "entities.user_mentions": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//************************************************ */

module.exports = router;
