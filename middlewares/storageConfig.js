const fetch = require("node-fetch");
const fs = require("fs");

const downloadFileFromUrl = async (url, path) => {
    return fetch(url).then(async res => {
        await res.body.pipe(fs.createWriteStream(path));
    })
}

const storageConfig = async (req, res, next) => {

    const arrayOfPathes = [];

    for (let i = 0; i < req.body.length; i++) {

        const fileName = `./images/${i}`;

        await downloadFileFromUrl(req.body[i].url, fileName)
            .then(() => {
                arrayOfPathes.push(fileName);
            })
            .catch(err => console.error(err));
    }
    req.arrayOfPathes = arrayOfPathes;
    next();

}

module.exports = storageConfig;