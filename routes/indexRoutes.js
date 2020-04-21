const express = require("express");

const mainControllers = require("../controllers/main");

const router = express.Router();

router.get("/", mainControllers.homePage);
router.get("/about", mainControllers.aboutPage);
router.get("/help", mainControllers.helpPage);
router.get("/news", mainControllers.newsPage);
router.post("/searchevents", mainControllers.searchEvents);

module.exports = router;
