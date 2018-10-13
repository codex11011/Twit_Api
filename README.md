
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
     3. [Sort Tweet](#sort-tweet)
        * [By Date](#by-date)
        * [By Retweet Count](#by-retweet-count)
        
     4. []




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
This section consist of a list of filters that can be applied to the data  
that is already stored in the database. 

----

##### Pagination
All the filters that are going to be applied have an optional query field  

> query-format => **?page=value1&limit=value2**  
**page** represents the number of page we are on.  
**limit** represents the number of results displayed per-page.

To apply pagination just add the above fields to the query
> example => localhost:3000/filter_tweets/all_tweets?page=0&limit=2 

> **use '&' to seperate all request query fields**


### Filters -

#### Search
> endpoint :- **localhost:3000/filter_tweets/search**

##### By Screen-Name

> endpoint :- **localhost:3000/filter_tweets/search/tweet_screen_name/`<params>`?sname=user_screen_name**  
> query-format :- **?sname=value**  
> example => localhost:3000/filter_tweets/search/tweet_text/sw?sname=Jack

 #### `<Params>` 
 
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |


##### By User-Name
> endpoint :- **localhost:3000/filter_tweets/search/tweet_username/`<params>`?name=user_name**  
> query-format :- **?name=value**  
> example => localhost:3000/filter_tweets/search/tweet_text/sw?name=Jack
  
 #### `<Params>` 
 
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |
  

##### By Tweet Text
> endpoint :- **localhost:3000/filter_tweets/search/tweet_text/`<params>`?text=value**  
> query-format :- **?text=value**  
> example => localhost:3000/filter_tweets/search/tweet_text/sw?text=Jack



 #### `<params>` 
 
|   params             |     represents         | 
| -------------------- |:----------------------:| 
|    **ex**            |   **equal to**         | 
|    **sw**            |   **starts with**      |
|    **ew**            |   **ends with**        |
|    **co**            |   **contains**         |


#### Sort Tweet
> endpoint :- **localhost:3000/filter_tweets/sort_tweet**


##### By Date
> endpoint :- **localhost:3000/filter_tweets/sort_tweet/by_date?order=<value>**  
> query-format :- **?text=value**  
> example => localhost:3000/filter_tweets/sort_tweet/by_date?order=asc



 #### `<value>` 
  
|         value             |        represents           | 
| ------------------------- |:---------------------------:| 
|    **asc**                |    **ascending order**      | 
|    **desc**               |    **descending order**     |


##### By Retweet Count
> endpoint :- **localhost:3000/filter_tweets/sort_tweet/by_rt_count?order=<value>**  
> query-format :- **?text=value**  
> example => localhost:3000/filter_tweets/sort_tweet/by_rt_count?order=asc



 #### `<value>` 
  
|         value             |        represents           | 
| ------------------------- |:---------------------------:| 
|    **asc**                |    **ascending order**      | 
|    **desc**               |    **descending order**     |


  


  
  
  
  
  
  
  
  
