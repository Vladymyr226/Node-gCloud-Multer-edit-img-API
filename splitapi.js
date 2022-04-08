require('dotenv').config()
const express = require('express');
const httpServer = express();
const router = require('./router');


bodyParser = require('body-parser');
httpServer.use(bodyParser.json({}));

// Promise.timeout = function (timeout, promise) {
//     return Promise.race([
//         promise,
//         new Promise(function (resolve, reject) {
//             setTimeout(function () { reject('Timed out'); }, timeout);
//         })
//     ]);
// }

httpServer.use('/', router);

// httpServer.get('/json', asyncMiddleware(async (req, res, next) => {
//     let jsonData = require('./_metadata.json')
//     var tokenId = req.query.token;
//     var jsonRow = jsonData[(tokenId-1)];
//     var responseData = JSON.stringify(jsonRow);
//     res.set('Content-Type', 'application/json');
//     res.set('Access-Control-Allow-Origin', '*')
//     res.send(responseData);
// }));

httpServer.listen(process.env.API_PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.API_PORT}`)
})