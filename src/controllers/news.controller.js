const config = require("../config/config");

const getNewsList = (req, resp, next) => {
    console.log(config);
};

module.exports = {
    getNewsList,
};