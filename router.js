const express = require("express");
const storageConfig = require("./configs/storageConfig");
const error = require("./handlers/errorHandler");
const resData = require("./handlers/responseHandler");

const asyncMiddleware = require("./middlewares/asyncMiddleware");
const fileFilter = require("./middlewares/uploadFile")

const { Storage } = require("@google-cloud/storage");
const req = require("express/lib/request");
const router = express.Router();



router.get('/', asyncMiddleware, function (req, res) {
    console.log("1")
    return resData(res, null);
});

router.get('/exit', asyncMiddleware, function (req, res) {
    console.log("2")
    setTimeout(process.exit, 1000);
    return resData(res, null);
});

router.get('/favicon.ico', function (req, res) {
    console.log("3")
    res.status(204).send({});
});

router.post('/split', asyncMiddleware, function (req, res) {
    // Timeout
    var timeout = typeof (req.body) === 'undefined' || typeof (req.body.timeout) === 'undefined' ? 2000 : parseInt(req.body.timeout);
    if (timeout < 1 || timeout > 10000) { timeout = 2000; }

    // Links
    var links = typeof (req.body.links) === 'undefined' ? [] : req.body.links;
    if (!links.length) {
        res.send({
            "ok": false,
            "error": "links_404"
        });
        return false;
    }

    var linksDone = 0;
    var results = [];

    var p = new Promise(function (resolve, reject) {
        var insideTime = setTimeout(function () {
            resolve(); res.send("insideout");
        }, timeout + 800);

        for (let i = 0; i < links.length; i++) {
            var incomeData = links[i];

            var aConfig = {
                "timeout": timeout,
            };

            if (typeof (incomeData.proxy) !== "undefinde") {
                aConfig["proxy"] = incomeData.proxy;
                if (true) { console.log("aConfig", aConfig); }
            }

            axios.get(incomeData.url, aConfig)
                .then(response => {
                    if (true) { console.log("link", link); }
                    if (true) { console.log("data", response.data); }
                    results[i] = {
                        "id": typeof (links[i].id) !== "undefined" ? links[i].id : null,
                        "linkUrl": links[i].url,
                        "linkData": response.data
                    };
                    linksDone++;
                    if (linksDone == links.length) {
                        clearTimeout(insideTime);
                        resolve();
                        if (true) { console.log("results", results); }
                        res.send({
                            "ok": true,
                            "results": results
                        });
                    }
                })
                .catch(error => {
                    results[i] = {
                        "id": typeof (links[i].id) !== "undefined" ? links[i].id : null,
                        "linkUrl": links[i].url,
                        "error": error.code,
                        "errorMsg": error.message,
                        "linkData": null
                    };
                    linksDone++;
                    if (linksDone == links.length) {
                        clearTimeout(insideTime);
                        resolve();
                        if (true) { console.log("results", results); }
                        res.send({
                            "ok": true,
                            "results": results
                        });
                    }
                });
        }
    });

    // Total Timeout
    return Promise.timeout(timeout + 1000, p, function () {
        res.send({
            "ok": false,
            "error": "total_timeout"
        });

        return false;
    });

    return resData(res, { "response": response });
});


// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the environment.

// const storage = new Storage();
// // Makes an authenticated API request.
// async function listBuckets() {
//     try {
//         const results = await storage.getBuckets();

//         const [buckets] = results;

//         console.log('Buckets:');
//         buckets.forEach(bucket => {
//             console.log(bucket.name);
//         });
//     } catch (err) {
//         console.error('ERROR:', err.message);
//     }
// }
// listBuckets();


router.post("/upload", storageConfig.single('img'), fileFilter, (req, res) => {
    if (!req.file) res.send("Ошибка при загрузке файла");
    else {
        // console.log(req.file)
        return res.status(200).send("Файл загружен");
    }
});

router.get('*', function (req, res) {
    console.log("*")
    return error(res, '404', 'page not found: ' + req.originalUrl);
});

module.exports = router;