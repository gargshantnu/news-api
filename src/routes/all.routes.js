const newsRouter = require("./news.routes").newsRouter;

const router = require("express").Router();



router.use("/news", newsRouter);

module.exports = {
    router
}