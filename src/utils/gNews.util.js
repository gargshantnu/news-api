const axios = require("axios");
const config = require("../config/config");

const searchNews = () => {
    const params = {
        apikey: config.gNews.apiKey,
        q: "example",
        lang: "en",
        country: "us",
        max: "10",
    };

    return axios.get(`${config.gNews.baseUrl}/search`, { params });
};

const getTrendingNews = () => {
    const params = {
        apikey: config.gNews.apiKey,
        max: "10",
        category: "general"
    };

    return axios.get(`${config.gNews.baseUrl}/top-headlines`, { params });
};

module.exports = {
    searchNews,
    getTrendingNews,
};