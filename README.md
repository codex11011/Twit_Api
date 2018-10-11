# Twitter Filter Search

### Table of content 
* [Description](#description)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)


## Description
****
This API uses **Twitter Search/Streaming API** to fetch and store the target tweets with metadata
(eg: user details, tweet time, favorites and retweet counts etc ) for a recent high traffic event
and create a **MVP**

Tasks:

 * fetch the data using **Twitter-search/stream API** and store it in database.
 * Retrieve data from database on the basis of filters applied.
 * Export filtered data as **CSV** file 


## Prerequisites
****
* you need to have nodejs and npm .
* This API make use of **twit** npm package.

   **twit** is Twitter API Client for node. Supports both the REST and Streaming API.
   ```javascript
   npm i twit --save
   ```
   > --save install package into local node_module directory.

* Package.json include *mongoose, moment, mongo-query-date, express, path, json2csv*
  for installing package(s):
    ```javascript
   npm i <package_name> --save
   ```
