const gNewsUtil = require("../utils/GNews.util");
const hazelCacheClient = require("../utils/hazelCache");

const getTrendingNewsArticles = async (limit) => {
    let data = await hazelCacheClient.getDataFromMap(
        "TRENDING_NEWS_LIST",
        "TRENDING_NEWS_LIST_KEY"
    );
    let articleList;

    if (!data || JSON.parse(data).length < limit) {
        // if there is no data in cache or cached data size is low - make new api call and cache that data.
        console.log("calling api", limit);
        articleList = await gNewsUtil.getTrendingNews(limit);
        hazelCacheClient.setDataIntoMap(
            "TRENDING_NEWS_LIST",
            "TRENDING_NEWS_LIST_KEY",
            JSON.stringify(articleList)
        );
    } else {
        console.log("returning cached data", limit);
        articleList = JSON.parse(data).splice(0, limit);
    }
    return articleList;
};

const searchNewsArticles = async (title, description, content) => {
    let search = gNewsUtil.prepareSearchQuery(title, description, content);
    let hash = search.in + search.q;
    let data = await hazelCacheClient.getDataFromMap("SEARCH_NEWS_LIST", hash);
    if (data) {
        return resp.json(data);
    }

    let articleList = await gNewsUtil.searchNews(title, description, content);

    hazelCacheClient.setDataIntoMap(
        "SEARCH_NEWS_LIST",
        hash,
        JSON.stringify(articleList)
    );
    return articleList;
};

module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
};
