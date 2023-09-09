# news-api

Below items are done in this project:

- Added 2 apis - one for fetching n trending news articles, another to search in news on basis of certain predefined parameters.
- Api validation is added in both the apis.
- In question, it was mentioned to create an api for finding a news article with a specific `title` or `author`, searching by `keywords`, but since news provider deos not support these parameters - i have made the api to search for `title`, `description`, and `content` of news articles - we can provide support for more parameters as well ( depending upon news api's availability ).
- I have used hazelcache as cache provider.
- Added cache on both trending article list api and search api.
- If multiple search parameters are selected at once, i am appending all of the search values with `OR` and putting all the fields inside `in` operator of news api. This will give undesired results, like if you want to search a particular `title` and `description` , it will mix it up, and search `description` in `title` as well - this is a limitation from news api provider - we can tackle it by looking for a different provider which have more freedom when doing searches or we will have to build our own database as well - where we can pull data from news provider and give more freedom in terms of search and other features.
- For trending news api, i have added cache on basis of `limit`, lets say user is asking for 5 news and in cache i have >= 5 news, then i am returning cached news, else i am making an api call and storing that data in cache and returning that new data to user. We can optimize this cache strategy as well. At the moment cache period is `5 min`.




### Pending items
- Add docker script to run api server.
- Proper error handling. Currently we dont know what all errors news provider can throw - so we will have to figure those out and handle all of them. For now, for any error, i am giving 500 status code and a message saying `"Result could not be computed, please contact developers to check logs."`.
- Add webpack build process - this minifies the code.
- Winston logger is not added - for now i have used console logs - which will output to standard streams - this needs to be moved to winston or some other logging library.
- At the moment caching logic is not scalable. In search response cache - i have used entire search query as cache key. This we can improve by hashing the search query to some fixed length character string - like we do for URL shortner - with this caching logic will also become scallable.



## Curl for apis:

1. Trending news api - this api will give top n trending news. It accepts query parameter `limit` whose default value is `10`.
```curl
curl --location 'http://localhost:3000/news/trending?limit=4'
```


2. Search news api - This api supports searching news on following parameters: `title`, `description`, and `content`. It accepts those as query param. 
Please note that it is mandatory to pass atleast 1 search parameter, if not passed - api will give error.
```curl
curl --location 'http://localhost:3000/news/search?title=bmw&description=car&content=price'
```


## How to run the project

Please follow below steps in very same order:

- Run below command to run cache server from root of this repo.
```
docker compose up
```
- Make sure you have node 14 or higher. ( Project is tested with v14.16.0 ). Run below command to start the project.
```
node app.js
```