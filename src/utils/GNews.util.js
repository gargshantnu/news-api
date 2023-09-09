const axios = require("axios");
const config = require("../config/config");

const prepareSearchQuery = (title, description, content) => {
    let q = {
        q: [],
        in: []
    }
    if (title) {
        q["in"].push("title");
        q["q"].push(title);
    }
    if (description) {
        q["in"].push("description");
        q["q"].push(description);
    }
    if (content) {
        q["in"].push("content");
        q["q"].push(content);
    }
    return {
        "in": q.in.join(","),
        "q": q.q.join(" OR ")
    };
}


const searchNews = (title, description, content) => {
    console.log(title, description, content);
    const params = {
        apikey: config.gNews.apiKey,
        lang: "en",
        country: "us",
        max: "10",
        ...prepareSearchQuery(title, description, content)
    };

    return axios.get(`${config.gNews.baseUrl}/search`, { params });
};

const getTrendingNews = (limit=10) => {
    const params = {
        apikey: config.gNews.apiKey,
        max: limit,
        category: "general"
    };

    return axios.get(`${config.gNews.baseUrl}/top-headlines`, { params });
};

module.exports = {
    searchNews,
    getTrendingNews,
};