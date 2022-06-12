require('dotenv').config();
const express = require('express');
const httpServer = express();
const router = require('./router');

bodyParser = require('body-parser');
httpServer.use(bodyParser.json({}));

httpServer.use('/', router);

httpServer.listen(process.env.API_PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.API_PORT}`);
});