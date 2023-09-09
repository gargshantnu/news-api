const newsRouter = require("express").Router();
const newsController = require("../controllers/news.controller");


newsRouter.get("/search", newsController.getNewsList);

module.exports = {
    newsRouter
}