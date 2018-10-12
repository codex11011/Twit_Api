# Twitter Filter Search

### Table of content 
1. [Description](#description)
2. [Getting Started](#getting-started)
   * [Prerequisites](#prerequisites)
   * [Installation](#installation-setting-up-project)
3. [End Points](#end-points)
   * [Twitter-Search](#twitter-search)
   * [Twitter-Filter](#twitter-filter)




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
  
 To run server file(Terminal 2):
  ```javascript
   run > node main.js
   ```
  * make sure you have **mongoDB** installed in your local machine ([get mongoDB](https://docs.mongodb.com/manual/installation/))and mongodb server running([mongod](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)) at port 27017(default).
  
 To run mongodb server(Terminal 1):
  ```javascript
   run > mongod
   ``` 
   
3. ## End Points
      
###Twitter-Search      

   
