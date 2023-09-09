const config = require("../config/config");
const gNewsUtil = require("../utils/GNews.util");
const hazelCacheClient = require("../utils/hazelCache");

const getTrendingNewsArticles = async (req, resp, next) => {
    try {
        // top n articles
        let { limit } = req.query;
        let data = await hazelCacheClient.getDataFromMap(
            "TRENDING_NEWS_LIST",
            "a"
        );
        let articleList;
        
        if (!data || JSON.parse(data).length < limit) {
            // if there is no data in cache or cached data size is low - make new api call and cache that data.
            console.log("calling api", limit);
            articleList = await gNewsUtil.getTrendingNews(limit);
            articleList = articleList.data.articles;
            hazelCacheClient.setDataIntoMap(
                "TRENDING_NEWS_LIST",
                "a",
                JSON.stringify(articleList)
            );
        } else {
            console.log("returning cached data", limit);
            articleList = JSON.parse(data).splice(0, limit);
        }

        return resp.json(articleList);
    } catch (e) {
        console.log(e);
    }
};

const searchNewsArticles = async (req, resp, next) => {
    try {
        // by title or description or contents
        let { title, description, content } = req.query;
        let articleList = await gNewsUtil.searchNews(title, description, content);
        return resp.json(articleList.data.articles);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
};
