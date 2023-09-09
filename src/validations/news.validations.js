const joi = require("joi");


const getTrendingNewsArticles = {
    query: joi.object().keys({
        limit: joi.number(),
    }),
};

const searchNewsArticles = {
    query: joi.object().keys({
        title: joi.string(),
        description: joi.string(),
        content: joi.string(),
    }).min(1),
};



module.exports = {
    getTrendingNewsArticles,
    searchNewsArticles,
}