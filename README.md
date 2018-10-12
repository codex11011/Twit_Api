# Twitter Filter Search

### Table of content 
1. [Description](#description)
2. [Getting Started](#getting-started)
   * [Prerequisites](#prerequisites)
   * [Installation](#installation)





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
****
### Prerequisites
  * you need to have nodejs and npm installed on your system . ([get_node](https://nodejs.org/en/download/))
  * This API make use of **twit** npm package.

     **twit** is Twitter API Client for node. Supports both the REST and Streaming API.
     Installation -
     ```javascript
     npm i twit --save
     ```
     > --save install package into local node_module directory.
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

 ### Installation (setup)
  Download the zip file and extract it.
  cd to the project folder 'Twit_API-master'.

   
