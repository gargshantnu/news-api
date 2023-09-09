const joi = require("joi");


const getTrendingNewsArticles = {
    query: joi.object().keys({
        // country: joi.string(),
    }),
};

const searchNewsArticles = {
    params: joi.object().keys({
        title: joi.string(),
        description: joi.string(),
        content: joi.string(),
    }),
};



module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
}