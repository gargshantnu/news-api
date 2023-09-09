const axios = require("axios");
const config = require("../config/config");
const { error } = require("console");

const prepareSearchQuery = (title, description, content) => {
    let q = {
        q: [],
        in: [],
    };
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
        in: q.in.join(","),
        q: q.q.join(" OR "),
    };
};

const searchNews = async (title, description, content) => {
    console.log(title, description, content);
    const params = {
        apikey: config.gNews.apiKey,
        lang: "en",
        country: "us",
        max: "10",
        ...prepareSearchQuery(title, description, content),
    };

    return Promise.resolve(
        axios.get(`${config.gNews.baseUrl}/search`, { params })
    )
        .then((response) => {
            return response.data.articles;
        })
        .catch((error) => {
            console.log("error fetching search results: ", error);
            throw new Error(error?.response?.data);
        });
};

const getTrendingNews = async (limit = 10) => {
    const params = {
        apikey: config.gNews.apiKey,
        max: limit,
        category: "general",
    };

    return Promise.resolve(
        axios.get(`${config.gNews.baseUrl}/top-headlines`, { params })
    )
        .then((response) => {
            return response.data.articles;
        })
        .catch((error) => {
            console.log("error fetching trending results: ", error);
            throw new Error(error?.response?.data);
        });
};

module.exports = {
    prepareSearchQuery,
    searchNews,
    getTrendingNews,
};
