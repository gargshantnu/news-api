const config = require("../config/config");
const gNewsUtil = require("../utils/gNews.util");


const getTrendingNewsArticles = async (req, resp, next) => {
    try {
        console.log(config);
        let r = await gNewsUtil.searchNews();
        console.log(r.data);
        return resp.json(r.data);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getTrendingNewsArticles,
};
