const newsRouter = require("express").Router();
const newsController = require("../controllers/news.controller");


newsRouter.get("/trending", newsController.getTrendingNewsArticles);
newsRouter.get("/search", newsController.searchNewsArticles);

module.exports = {
    newsRouter
}