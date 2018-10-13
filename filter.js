
const Twitter_Data = require("./data_schema");
const moment = require("moment");
let router = require("express").Router();
let import_data_csv = require("./importData");
//******************************************** */
/******************* NOTE *********************/
// if you want to save any data just add &save=1 to query
//example->
///  filter_tweets/search/tweet_screenname/ew?name=Mark&page=0&limit=3&save=1
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

//  query-format -> /filter_tweets/get_all/tweets?page=0&limit=3
router.get("/get_all/tweets", (req, res) => {
  obj = {};
  paginate(req, res, obj);
});

/***************************************** */
//Search

router.get("/search", (req, res) => {
  res.send("welcome to twitter search-filter");
});
/*******************************************/

//Screen_name

// query-format -> /filter_tweets/search/tweet_screenname/ex?sname=Mark&page=0&limit=3
//(exact match)
//case-sensitive
router.get("/search/tweet_screen_name/ex", (req, res) => {
  obj = { "user.screen_name": req.query.sname };
  paginate(req, res, obj);
});

// query-format -> /filter_tweets/search/tweet_screenname/sw?sname=Ja&page=0&limit=3
router.get("/search/tweet_screen_name/sw", (req, res) => {
  let regexp = new RegExp("^" + req.query.sname);
  obj = { "user.screen_name": regexp };
  paginate(req, res, obj);
});

// query-format -> /filter_tweets/search/tweet_screenname/ew?sname=Mark&page=0&limit=3
router.get("/search/tweet_screen_name/ew", (req, res) => {
  let regexp = new RegExp(req.query.sname + "$");
  obj = { "user.screen_name": regexp };
  paginate(req, res, obj);
});

/************************************************* */
//User_name

//exact match
// query-format -> /filter_tweets/search/tweet_username/ex?name=Mark&page=0&limit=3
router.get("/search/tweet_username/ex", (req, res) => {
  obj = { "user.name": req.query.name };
  paginate(req, res, obj);
});

// query-format -> /filter_tweets/search/tweet_username/sw?name=Ja&page=0&limit=3
router.get("/search/tweet_username/sw", (req, res) => {
  let regexp = new RegExp("^" + req.query.name);
  obj = { "user.name": regexp };
  paginate(req, res, obj);
});

// query-format -> /filter_tweets/search/tweet_username/ew?name=Mark&page=0&limit=3
router.get("/search/tweet_username/ew", (req, res) => {
  let regexp = new RegExp(req.query.name + "$");
  obj = { "user.name": regexp };
  paginate(req, res, obj);
});

/******************************************* */
//Search Tweet Text

//search for substring
// query-format -> /filter_tweets/search/tweet_text/co?text=Breath&page=0&limit=2
router.get("/search/tweet_text/co", (req, res) => {
  obj = { tweet_text: { $regex: `${req.query.text}`, $options: "i" } };
  paginate(req, res, obj);
});

//search for exact-match
// query-format -> /filter_tweets/search/tweet_text/ex?text=Breath&page=0&limit=2
router.get("/search/tweet_text/ex", (req, res) => {
  obj = { tweet_text: req.query.text };
  paginate(req, res, obj);
});

//search for starts_with
// query-format -> /filter_tweets/search/tweet_text/sw?text=Ja&page=0&limit=2
router.get("/search/tweet_text/sw", (req, res) => {
  let regexp = new RegExp("^" + req.query.text);
  obj = { tweet_text: regexp };
  paginate(req, res, obj);
});

//search for ends_with
// query-format -> /filter_tweets/search/tweet_text/ew?text=Rt&page=0&limit=2
router.get("/search/tweet_text/ew", (req, res) => {
  var regexp = new RegExp(req.query.text + "$");
  obj = { tweet_text: regexp };
  paginate(req, res, obj);
});
/**************************************************************** */

//Sorting


router.get("/sort_tweet", (req, res) => {
  res.send("welcome to twitter sort_tweet-filter");
});

// query-format -> /filter_tweets/sort_tweet/by_date?order=asc&page=0&limit=2
//order can take asc or desc

router.get("/sort_tweet/by_date", (req, res) => {
  obj = { created_at: req.query.order };
  paginate1(req, res, obj);
});

// query-format -> /filter_tweets/sort_tweet/by_rt_count?order=asc&page=0&limit=2
//order can take asc or desc
router.get("/sort_tweet/by_rt_count", (req, res) => {
  obj = { retweet_count: req.query.order };
  paginate1(req, res, obj);
});

//******************************************************** */

//************************************************** */

//Retweet_count

//give tweets with retweet_count greator than a value
// query-format -> /filter_tweets/r_filter/rt_count/gt?value=250&page=0&limit=2
router.get("/r_filter/rt_count/gt", (req, res) => {
  obj = { retweet_count: { $gt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count less than a value
// query-format -> /filter_tweets/r_filter/rt_count/lt?value=250&page=0&limit=2
router.get("/r_filter/rt_count/lt", (req, res) => {
  obj = { retweet_count: { $lt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count greator than or equal to a value
// query-format -> /filter_tweets/r_filter/rt_count/gte?value=250&page=0&limit=2
router.get("/r_filter/rt_count/gte", (req, res) => {
  obj = { retweet_count: { $gte: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count less than or equal to a value
// query-format -> /filter_tweets/r_filter/rt_count/lte?value=250&page=0&limit=2
router.get("/r_filter/rt_count/lte", (req, res) => {
  obj = { retweet_count: { $lte: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with retweet_count in a particular range eg:- [250,400]
// query-format -> /filter_tweets/r_filter/rt_count/range?value1=250&value2=400&page=0&limit=2s
router.get("/r_filter/rt_count/range", (req, res) => {
  let lte = Math.max(req.query.value1, req.query.value2);
  let gte = Math.min(req.query.value1, req.query.value2);
  obj = { retweet_count: { $gte: gte, $lte: lte } };
  paginate(req, res, obj);
});

//find all tweets with retweet_count with a particular value (exactMatch)
// query-format -> /filter_tweets/r_filter/rt_count/ex?value=225&page=0&limit=2
router.get("/r_filter/rt_count/ex", (req, res) => {
  obj = { retweet_count: req.query.value };
  paginate(req, res, obj);
});

//****************************************** */

//Followers_count

//give tweets with user's followers_count greator than a value
// query-format -> /filter_tweets/r_filter/fl_count/gte?value=250&page=0&limit=2
router.get("/r_filter/fl_count/gt", (req, res) => {
  obj = { "user.followers_count": { $gt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with user's followers_count less than a value
// query-format -> /filter_tweets/r_filter/fl_count/lte?value=250&page=0&limit=2
router.get("/r_filter/fl_count/lt", (req, res) => {
  obj = { "user.followers_count": { $lt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with user's followers_count in a particular range eg:- [250,400]
// query-format -> /filter_tweets/r_filter/fl_count/range?value1=250&value2=400&page=0&limit=2
router.get("/r_filter/fl_count/range", (req, res) => {
  let lte = Math.max(req.query.value1, req.query.value2);
  let gte = Math.min(req.query.value1, req.query.value2);
  obj = { "user.followers_count": { $gte: gte, $lte: lte } };
  paginate(req, res, obj);
});

//find all tweets with followers_count with a particular value (exactMatch)
// query-format -> /filter_tweets/r_filter/fl_count/ex?value=225&page=0&limit=2
router.get("/r_filter/fl_count/ex", (req, res) => {
  obj = { "user.followers_count": req.query.value };
  paginate(req, res, obj);
});

//****************************************** */

//Favourite_count

//give tweets with favourite_count greator than a value
// query-format -> /filter_tweets/r_filter/fv_count/gte?value=250&page=0&limit=2
router.get("/r_filter/fv_count/gt", (req, res) => {
  obj = { tweet_favourite_count: { $gt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with followers_count less than a value
// query-format -> /filter_tweets/r_filter/fv_count/lt?value=250
router.get("/r_filter/fv_count/lt", (req, res) => {
  obj = { tweet_favourite_count: { $lt: req.query.value } };
  paginate(req, res, obj);
});

//give tweets with followers_count in a particular range eg:- [250,400]
// query-format -> /filter_tweets/r_filter/fv_count/range?value1=250&value2=400&page=0&limit=2
router.get("/r_filter/fv_count/range", (req, res) => {
  let lte = Math.max(req.query.value1, req.query.value2);
  let gte = Math.min(req.query.value1, req.query.value2);
  obj = { tweet_favourite_count: { $gte: gte, $lte: lte } };
  paginate(req, res, obj);
});

//find all tweets with favourite_count with a particular value (exactMatch)
// query-format -> /filter_tweets/r_filter/fv_count/ex?value=225&page=0&limit=2
router.get("/r_filter/fv_count/ex", (req, res) => {
  obj = { tweet_favourite_count: req.query.value };
  paginate(req, res, obj);
});

//****************************************** */

//Language
//find all tweets with a particular language code
// query-format -> /filter_tweets/search/lang?lang=en&page=0&limit=2
router.get("/search/lang", (req, res) => {
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
//query-format -> /filter_tweets/r_filter/date_range?date1=2018-10-09&date2=2018-10-15&page=0&limit=2
router.get("/r_filter/date_range", (req, res) => {
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
// query-format -> /filter_tweets/get_all/name?&page=0&limit=2
router.get("/get_all/name", (req, res) => {
  obj1 = {};
  obj2 = { "user.name": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//get screen_name of all the tweets
// query-format -> /filter_tweets/get_all/screen_name?&page=0&limit=2
router.get("/get_all/screen_name", (req, res) => {
  obj1 = {};
  obj2 = { "user.screen_name": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//other user mentioned in the tweet by the owner of the tweet
//result contains username of the owner of the tweet and array
//of object of user refrenced
// query-format -> /filter_tweets/filter/user_mentions?&page=0&limit=2
router.get("/get_all/user_mentions", (req, res) => {
  obj1 = {};
  obj2 = { "user.name": 1, "entities.user_mentions": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});

//Urls
//find all links in all the tweets
// query-format -> /filter_tweets/getdata/urls?&page=0&limit=2
router.get("/get_all/urls", (req, res) => {
  obj1 = {};
  obj2 = { "entities.urls.expanded_url": 1, _id: 0 };
  paginate2(req, res, obj1, obj2);
});




//USER MENTIONS
//search user_mentions > screen_name by starts with
//query-format->  /filter_tweets/search/user_mentions/screen_name/sw?sname=Mark&page=0&limit=2
//case-sensitive
router.get("/search/user_mentions/screen_name/sw", (req, res) => {
  let regx = new RegExp("^" + req.query.sname);
  obj = { "entities.user_mentions.screen_name": regx };
  paginate(req, res, obj);
});

//search user_mentions > screen_name by ends with
//query-format->  /filter_tweets/search/user_mentions/screen_name/ew?sname=Mark&page=0&limit=2
//case-sensitive
router.get("/search/user_mentions/screen_name/ew", (req, res) => {
  let regx = new RegExp(req.query.sname + "$");
  obj = { "entities.user_mentions.screen_name": regx };
  paginate(req, res, obj);
});

//search user_mentions > screen_name (exact match)
//query-format->  /filter_tweets/search/user_mentions/screen_name/ex?sname=Mark&page=0&limit=2
//case-sensitive
router.get("/search/user_mentions/screen_name/ex", (req, res) => {
  let regx = new RegExp(req.query.sname);
  obj = { "entities.user_mentions.screen_name": regx };
  paginate(req, res, obj);
});
//************************************************ */

//search user_mentions > user_name by starts with
//query-format->  /filter_tweets/search/user_mentions/username/sw?name=Mark&page=0&limit=2
//case-sensitive
router.get("/search/user_mentions/username/sw", (req, res) => {
  let regx = new RegExp("^" + req.query.name);
  obj = { "entities.user_mentions.name": regx };
  paginate(req, res, obj);
});

//search user_mentions > user_name by ends with
//query-format->  /filter_tweets/search/user_mentions/username/ew?name=Mark&page=0&limit=2
//case-sensitive
router.get("/search/user_mentions/username/ew", (req, res) => {
  let regx = new RegExp(req.query.name + "$");
  obj = { "entities.user_mentions.name": regx };
  paginate(req, res, obj);
});

//search user_mentions > user_name (exact match)
//query-format->  /filter_tweets/search/user_mentions/username/ex?name=Mark&page=0&limit=2
//case-sensitive
router.get("/search/user_mentions/username/ex", (req, res) => {
  let regx = new RegExp(req.query.name);
  obj = { "entities.user_mentions.name": regx };
  paginate(req, res, obj);
});
/*******************************************************/



module.exports = router;
