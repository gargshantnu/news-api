const newsService = require("../services/news.service");

const getTrendingNewsArticles = async (req, resp, next) => {
    try {
        // top n articles
        let { limit } = req.query;
        let articleList = await newsService.getTrendingNewsArticles(limit);
        return resp.json(articleList);
    } catch (err) {
        console.log("executing error handler for error: ", err);
        return resp
            .status(500)
            .json({
                message:
                    "Result could not be computed, please contact developers to check logs.",
            });
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
    } catch (err) {
        console.log("executing error handler for error: ", err);
        return resp
            .status(500)
            .json({
                message:
                    "Result could not be computed, please contact developers to check logs.",
            });
    }
};

module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
};
