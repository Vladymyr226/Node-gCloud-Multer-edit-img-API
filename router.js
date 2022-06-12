const express = require("express");
const error = require("./handlers/errorHandler");
const resData = require("./handlers/responseHandler");
const storageConfig = require("./middlewares/storageConfig");
const asyncMiddleware = require("./middlewares/asyncMiddleware");
const imgResize = require('./middlewares/resizeImages');
const getMimeFromPath = require("./middlewares/mimetype");

const router = express.Router();

router.get('/', asyncMiddleware, function (req, res) {
  return resData(res, null);
});

router.get('/exit', asyncMiddleware, function (req, res) {
  setTimeout(process.exit, 1000);
  return resData(res, null);
});

router.get('/favicon.ico', function (req, res) {
  res.status(204).send({});
});

router.post("/upload", storageConfig, getMimeFromPath, imgResize, (req, res) => {
  // console.log(req); 
  if (!req.body.url) res.send("Вы не выбрали данные для загрузки!");
  else return res.status(200).send("Файл загружен");
});

router.get('*', function (req, res) {
  console.log("*");
  return error(res, '404', 'page not found: ' + req.originalUrl);
});

module.exports = router;