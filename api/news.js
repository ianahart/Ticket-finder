const fetch = require('node-fetch');

require("dotenv").config();
const retrieveNews = async () => {
  const baseUrl = 'https://newsapi.org/v2/';
  const baseEndPoint = `top-headlines?country=us&pageSize=15&category=music&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const response = await fetch(baseUrl + baseEndPoint);
    const data = await response.json();

    return data;

  } catch (err) {

    console.log('ERROR:', err);
  }
}

module.exports = retrieveNews;