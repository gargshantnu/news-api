const newsService = require("../services/news.service");

const getTrendingNewsArticles = async (req, resp, next) => {
    try {
        // top n articles
        let { limit } = req.query;
        let articleList = await newsService.getTrendingNewsArticles(limit);
        return resp.json(articleList);
    } catch (e) {
        console.log(e);
    }
};

const searchNewsArticles = async (req, resp, next) => {
    try {
        // by title or description or contents
        let { title, description, content } = req.query;
        let articleList = await newsService.searchNewsArticles(
            title,
            description,
            content
        );
        return resp.json(articleList);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
};
