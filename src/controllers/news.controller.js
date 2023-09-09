const config = require("../config/config");
const gNewsUtil = require("../utils/GNews.util");


const getTrendingNewsArticles = async (req, resp, next) => {
    try {
        // top n articles
        let { limit } = req.query;
        let r = await gNewsUtil.getTrendingNews(limit);
        console.log(r.data);
        return resp.json(r.data);
    } catch (e) {
        console.log(e);
    }
};

const searchNewsArticles = async (req, resp, next) => {
    try {
        // by title or description or contents
        let { title, description, content } = req.query;
        let r = await gNewsUtil.searchNews(title, description, content);
        console.log(r.data);
        return resp.json(r.data);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
};
