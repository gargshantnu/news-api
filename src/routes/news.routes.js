const newsRouter = require("express").Router();
const newsController = require("../controllers/news.controller");
const newsReqValidations = require("../validations/news.validations");
const validator = require('express-joi-validation').createValidator({})


newsRouter.get(
    "/trending",
    validator.query(newsReqValidations.getTrendingNewsArticles.query),
    newsController.getTrendingNewsArticles
);

newsRouter.get(
    "/search",
    validator.query(newsReqValidations.searchNewsArticles.query),
    newsController.searchNewsArticles
);

module.exports = {
    newsRouter
}