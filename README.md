
# Twitter Filter Search

### Table of content 
1. [Description](#description)
2. [Getting Started](#getting-started)
   * [Prerequisites](#prerequisites)
   * [Installation](#installation-setting-up-project)
3. [End Points](#end-points)
   * [Server file](#server-file)
   * [Twitter-Search](#twitter-search)
   * [Twitter-Filter](#twitter-filter)
     1. [Pagination](#pagination)
     2. [Search](#search)
        * [By Screen-Name](#by-screen-name)
        * [By User-Name](#by-user-name)
        * [By Tweet Text](#by-tweet-text)
        * [By User Mentions](#by-user-mentions)
           1. [ScreenName](#screenname)
           2. [UserName](#username)
           
     3. [Sort Tweet](#sort-tweet)
        * [By Date](#by-date)
        * [By Retweet Count](#by-retweet-count)
     
     4. [Range Filters](#range-filters)
        * [Retweet Count](#retweet-count)
        * [Followers Count](#followers-count)
        * [Favourites Count](#favourites-count)
        * [Date](#date)
     5. [Get all Data](#get-all-data)
     
   * [Save as CSV](#save-as-csv) 




## Documentation -


1. ## Description
****
This API uses **Twitter Search/Streaming API** to fetch and store the target tweets with metadata
(eg: user details, tweet time, favorites and retweet counts etc ) for a recent high traffic event
and create a **MVP**

Tasks:

 * fetch the data using **Twitter-search/stream API** and store it in database.
 * Retrieve data from database on the basis of filters applied.
 * Export filtered data as **CSV** file 



2. ## Getting Started
> Following instructions will get you a copy of the project up and running on your local machine
****
### Prerequisites
  * you need to have nodejs and npm installed on your system . ([get_node](https://nodejs.org/en/download/))
  * This API make use of **twit** npm package.
  ```
      'twit' is Twitter API Client for node. Supports both the REST and Streaming API.  
  ```
  * Package.json include
    + mongoose
    + moment
    + mongo-query-date
    + express
    + path
    + json2csv
  
     
For installing package(s):
   ```javascript
   npm i <package_name> --save
   ```
> --save install package into local node_module directory.


 ### Installation (setting up project)
  * Download the zip file and extract it.
  * Cd to the project folder 'Twit_API-master'.
  * make sure you have **mongoDB** installed in your local machine ([get mongoDB](https://docs.mongodb.com/manual/installation/))and mongodb server running([mongod](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)) at port 27017(default).
  
    
 To run server file(Terminal 1):
  ```javascript
   run > node main.js
   ```
  
 To run mongodb server(Terminal 2):
  ```javascript
   run > mongod
   ``` 
   
3. ## End Points
 > list of all endpoints provided by this api.
 ****
 ### Server File
 consist of a 'get()' method which list operations to get Twitter_search and Filter_Tweets api. 
 
 renders the main page:-
 > url : **localhost:3000/**
 
 renders Twitter_search page:-
 > url : **localhost:3000/twitter_search**
 
 renders Filter_Tweets page:-
 > url : **local:3000/filter_tweets**

 > NOTE: `localhost:3000 equals 127.0.0.1:3000` is just where our server(main.js) is running. 

 > <img src="https://github.com/shubham-tin/Twit_Api/blob/master/images/code2.png"
     alt="Markdown Monster icon"
      width=50% height=50%
    />

 ### Twitter-Search
 
 To render Twitter-Search response page use:- 
> url : **localhost:3000/twitter_search** 

To **get data** from twitter-search api use:-  
> endpoint:- **/twitter_search/get_data?q=Keyword&date=YYYY-MM-DD&count=value** 
```
where 'q' is the 'Keyword'  
'date' value represents since which date you want your data  
'count' is number of results you want to store
After this data is stored in database , we will get "data stored to database" response.
```
> example => localhost:3000/twitter_search/get_data?q=Elonmusk&date=2018-10-09&count=10  

 ### Twitter-Filter

 To render Twitter-Filter response page use:-
 > url : **localhost:3000/filter_tweets** 
 
 
#### Twitter-Filter query and endpoints  

```
  This section consist of a list of filters that can be applied to the data  
  that is already stored in the database. 
```
----

##### Pagination  

```
  All the filters that are going to be applied have an optional query field  
```

> query-format => **?page=value1&limit=value2**  
**page** represents the number of page we are on.  
**limit** represents the number of results displayed per-page.

``` 
    If no value of page and limit field are added or if page and limit query fields are not used,  
    then, default value of page and limit will be considered.  
    page = 0 (default)  
    limit = 10 (default)
```  
> To apply pagination just add the above fields to the query
> example => localhost:3000/filter_tweets/get_all/tweets?page=0&limit=2 

> **use '&' to seperate all request query fields**


### Filters -
****

#### Search
> **endpoint :- localhost:3000/filter_tweets/search**  

##### By Screen-Name

> **endpoint :- localhost:3000/filter_tweets/search/tweet_screen_name/`<params>`?sname=user_screen_name**  

> **query-format :- ?sname=value**  

> **example** => localhost:3000/filter_tweets/search/tweet_text/sw?sname=Jack  


 #### `<Params>`  
   
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |  


##### By User-Name

```every tweet has user info attached to it```  

> **endpoint :- localhost:3000/filter_tweets/search/tweet_username/`<params>`?name=user_name**  

> **query-format :- ?name=value**  

> **example** => localhost:3000/filter_tweets/search/tweet_username/sw?name=Jack  


 #### `<Params>`  
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |

  
##### By Tweet Text  

``` search by text in the tweet```  

> **endpoint :- localhost:3000/filter_tweets/search/tweet_text/`<params>`?text=value**  

> **query-format :- ?text=value**  

> **example** => localhost:3000/filter_tweets/search/tweet_text/sw?text=Jack  


 #### `<params>`  
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |
|    **co**            |   **contains**         |

****



### By User Mentions  

```
  user_mentions entity contain username and screen-name of other user's mentioned in the tweet.
```  
  
 ##### ScreenName  
 ```
  filter by sreen-name of mentioned user's
 ```  
 
> **endpoint :- localhost:3000/filter_tweets/search/user_mentions/screen_name/`<params>`?sname=screen_name**  

> **query-format :- ?sname=screen_name**  

> **example** => localhost:3000/filter_tweets/search/user_mentions/screen_name/sw?name=Ja  
  
 #### `<Params>`  
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |


 ##### UserName  

``` 
  filter by user-name of mentioned user's
  ```  

> **endpoint :- localhost:3000/filter_tweets/search/user_mentions/username/`<params>`?name=username**  

> **query-format :- ?name=username**  

> **example** => localhost:3000/filter_tweets/search/user_mentions/username/sw?name=Ja  
  
 #### `<Params>`  
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |

****  



#### Sort Tweet
> endpoint :- **localhost:3000/filter_tweets/sort_tweet**  

##### By Date
> **endpoint :- localhost:3000/filter_tweets/sort_tweet/by_date?order=`<value>`**  

> **query-format :- ?order=`<value>`**  

> **example  =>  localhost:3000/filter_tweets/sort_tweet/by_date?order=asc**  

 #### `<value>`  
 
|         value             |        represents           | 
| ------------------------- |:---------------------------:| 
|    **asc**                |    **ascending order**      | 
|    **desc**               |    **descending order**     |


##### By Retweet Count  

> **endpoint :- localhost:3000/filter_tweets/sort_tweet/by_rt_count?order=`<value>`**  

> **query-format :- ?order=value**  

> **example** => localhost:3000/filter_tweets/sort_tweet/by_rt_count?order=asc  

 #### `<value>`  
 
|         value             |        represents           | 
| ------------------------- |:---------------------------:| 
|    **asc**                |    **ascending order**      | 
|    **desc**               |    **descending order**     |

****



#### Range Filters

```
  These filters are governed by range parameters
```  

> **endpoint :- localhost:3000/filter_tweets/r_filter/`<params_1>`/`<params2>`?`<query>`**  

``` params_1 :- rt_count, fl_count, fv_count.```  

##### Retweet Count

> **endpoint :-  localhost:3000/filter_tweets/r_filter/rt_count/`<params>`?`<query>`**
 

|         params           |        represents                 |      query fields         |     Interval          |
| -------------------------|:---------------------------------:|:-------------------------:|----------------------:|
|         **ex**           |         **equal to**              |        **value**          |       value ==        |
|         **gt**           |       **greator than**            |        **value**          |       value <         |
|         **lt**           |       **lower than**              |        **value**          |       value >         |
|         **gte**          |    **greator than or equal to**   |        **value**          |       value <=        |
|         **lte**          |    **lower than or equal to**     |        **value**          |       value >=        |
|        **range**         |     **range in between**          |      **value1,value2**    |     value1<= =<value2 |
|                          |                                   |                           |  or value2<= =<value1 |  


```num,num1,num2 represents numeric value```  
> **query format** :-  ?value=num  **or** ?value1=num1&value2=num2  

> **ex example**  =>  localhost:3000/filter_tweets/r_filter/rt_count/ex?value=200  

> **gt example**  =>  localhost:3000/filter_tweets/r_filter/rt_count/gt?value=200  

> **lt example**  =>  localhost:3000/filter_tweets/r_filter/rt_count/lt?value=200  

> **gte example**  =>  localhost:3000/filter_tweets/r_filter/rt_count/gte?value=200  

> **lte example**  =>  localhost:3000/filter_tweets/r_filter/rt_count/lte?value=200  

> **range example**  =>  localhost:3000/filter_tweets/r_filter/rt_count/range?value1=200&value2=300  


##### Followers Count

> **endpoint :-  localhost:3000/filter_tweets/r_filter/fl_count/`<params>`?`<query>`**
 

|         params           |        represents                 |      query fields         |     Interval          |
| -------------------------|:---------------------------------:|:-------------------------:|----------------------:|
|         **ex**           |         **equal to**              |        **value**          |       value ==        |
|         **gt**           |       **greator than**            |        **value**          |       value <         |
|         **lt**           |       **lower than**              |        **value**          |       value >         |
|        **range**         |     **range in between**          |      **value1,value2**    |     value1<= =<value2 |
|                          |                                   |                           |  or value2<= =<value1 |  


```num,num1,num2 represents numeric value```  
> **query format** :-  ?value=num  **or** ?value1=num1&value2=num2  

> **ex example**  =>  localhost:3000/filter_tweets/r_filter/fl_count/ex?value=200  

> **gt example**  =>  localhost:3000/filter_tweets/r_filter/fl_count/gt?value=200  

> **lt example**  =>  localhost:3000/filter_tweets/r_filter/fl_count/lt?value=200  

> **range example**  =>  localhost:3000/filter_tweets/r_filter/fl_count/range?value1=200&value2=300  


##### Favourites Count

> **endpoint :-  localhost:3000/filter_tweets/r_filter/fv_count/`<params>`?`<query>`**
 

|         params           |        represents                 |      query fields         |     Interval          |
| -------------------------|:---------------------------------:|:-------------------------:|----------------------:|
|         **ex**           |         **equal to**              |        **value**          |       value ==        |
|         **gt**           |       **greator than**            |        **value**          |       value <         |
|         **lt**           |       **lower than**              |        **value**          |       value >         |
|        **range**         |     **range in between**          |      **value1,value2**    |     value1<= =<value2 |
|                          |                                   |                           |  or value2<= =<value1 |  


```num,num1,num2 represents numeric value```  
> **query format** :-  ?value=num  **or** ?value1=num1&value2=num2  

> **ex example**  =>  localhost:3000/filter_tweets/r_filter/fv_count/ex?value=200  

> **gt example**  =>  localhost:3000/filter_tweets/r_filter/fv_count/gt?value=200  

> **lt example**  =>  localhost:3000/filter_tweets/r_filter/fv_count/lt?value=200  

> **range example**  =>  localhost:3000/filter_tweets/r_filter/fv_count/range?value1=200&value2=300  


##### Followers Count

> **endpoint :-  localhost:3000/filter_tweets/r_filter/fl_count/`<params>`?`<query>`**
 

|         params           |        represents                 |      query fields         |     Interval          |
| -------------------------|:---------------------------------:|:-------------------------:|----------------------:|
|         **ex**           |         **equal to**              |        **value**          |       value ==        |
|         **gt**           |       **greator than**            |        **value**          |       value <         |
|         **lt**           |       **lower than**              |        **value**          |       value >         |
|        **range**         |     **range in between**          |      **value1,value2**    |     value1<= =<value2 |
|                          |                                   |                           |  or value2<= =<value1 |  


```num,num1,num2 represents numeric value```  
> **query format** :-  ?value=num  **or** ?value1=num1&value2=num2  

> **ex example**    =>     localhost:3000/filter_tweets/r_filter/fl_count/ex?value=200  

> **gt example**    =>     localhost:3000/filter_tweets/r_filter/fl_count/gt?value=200  

> **lt example**    =>     localhost:3000/filter_tweets/r_filter/fl_count/lt?value=200  

> **range example** =>     localhost:3000/filter_tweets/r_filter/fl_count/range?value1=200&value2=300  


##### Date 

> **endpoint :-  localhost:3000/filter_tweets/r_filter/date_range/?`<query>`**  

> **query format** :-  ?date1=YYYY-MM-DD&date2=YYYY-MM-DD  

|      query fields         |     date -format     |
|---------------------------|---------------------:|
|      **date1,date2**      |      YYYY-MM-DD      |  

```
  Their is no order attach with the dates ie., date1 > date2 or date2 > date1  
```   
> **date range example** =>     localhost:3000/filter_tweets/r_filter/date_range?date1=2018-10-09&date2=2018-11-09  



### Get all Data
  
  > endpoints :-  localhost:3000/get_all/`<params>`
  
  
|         params           |           endpoints                       |  get data(for a particular keyword search)  |
|--------------------------|:-----------------------------------------:|--------------------------------------------:|
|       **tweets**         |    localhost:3000/get_all/tweets          |  get all the tweets stored in database      |
|        **name**          |    localhost:3000/get_all/name            |  get username of all the user's who tweeted |
|      **screen_name**     |    localhost:3000/get_all/screen_name     |  get screen name of all use's who tweeted   |
|    **user_mentions**     |    localhost:3000/get_all/user_mentions   |  get all the user mentioned in all tweets   |
|        **urls**          |    localhost:3000/get_all/urls            |  get all the urls of all the tweets         |




### Save as CSV  

> just like pagination, this api has provided an optional query-field to save filtered result as csv file.

``` 
    If you want to store any filtered result as a CSV file, just add 'save=1' to the query-fields.  
    If not mentioned the default value for this field is taken as 0.
```

  
  
  
  
  
