const config = require("../config/config");
const gNewsUtil = require("../utils/GNews.util");


const getTrendingNewsArticles = async (req, resp, next) => {
    try {
        // top n articles
        let r = await gNewsUtil.getTrendingNews();
        console.log(r.data);
        return resp.json(r.data);
    } catch (e) {
        console.log(e);
    }
};

const searchNewsArticles = async (req, resp, next) => {
    try {
        // by title or description or contents
        console.log(req.query);
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
