const fetch = require("node-fetch");
const mongoose = require('mongoose');

const City = require('../models/City');
const retrieveNews = require('../api/news');

require("dotenv").config();

module.exports.homePage = (req, res, next) => {
  res.render("home", {
    pageTitle: "Home",
    errors: '',
    eventData: '',
    city: ''

  });
};

module.exports.aboutPage = (req, res, next) => {
  res.render("about", {
    pageTitle: "About",
  });
};

module.exports.helpPage = (req, res, next) => {
  res.render("help", {
    pageTitle: "Help",
  });
};

module.exports.newsPage = (req, res, next) => {
  retrieveNews().then((data) => {
    if (data.status === 'ok') {
      res.render('news', {
        pageTitle: 'News',
        data: data.articles,
        errorMessage: ''
      })
    } else {
      res.render('news', {
        pageTitle: 'News',
        data: '',
        errorMessage: 'Trouble fetching the news'
      })
    }

  }).catch((err) => {
    console.log('Error:', err);
  });
};

module.exports.searchEvents = (req, res, next) => {
  let errors = [];


  if (!req.body.city) {
    errors.push({ message: "Form field must not be empty" });
  }

  const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
  const baseQuery = `?classificationName=music&countryCode=US&city=${req.body.city}&apikey=${process.env.TICKETMASTER_API_KEY}`;

  const fetchEventsData = async () => {
    try {
      const response = await fetch(baseUrl + baseQuery);
      const data = await response.json();

      if (data.page.totalElements === 0) {
        req.flash('error_message', 'Sorry, no records of that city.');
      } else {
        return data;
      }

    } catch (err) {
      console.log(("Error:", err));
    }
  };

  if (errors.length > 0) {
    return res.render('home', {
      pageTitle: 'home',
      errors: errors,
      eventData: '',
      city: ''

    });
  } else {
    const citySearch = new City({
      searchLocation: req.body.city,
    })
    citySearch
      .save()
      .then(search => {
      console.log(`Search: ${search}`);
    }).catch((err) => console.log(`ERROR: ${err}`));
  }
  fetchEventsData().then((data) => {

    if (!data) {
      res.render("home", {
        pageTitle: "Home",
        eventData: '',
        errors: '',
        city: ''

      });
    } else {
      res.render("home", {
        pageTitle: "Home",
        eventData: data._embedded.events,
        errors: "",
        city: req.body.city
      });
    }
  }).catch((err) => console.log(err));
};
