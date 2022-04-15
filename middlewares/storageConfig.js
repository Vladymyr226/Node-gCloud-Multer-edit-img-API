const fetch = require("node-fetch");
const fs = require("fs");

const downloadFileFromUrl = async (url, path) => {
  const res = await fetch(url);
  res.body.pipe(fs.createWriteStream(path));
  return new Promise((resolve) => {
    res.body.on('end', resolve);
  });

  // return fetch(url).then(async res => {
  //     await res.body.pipe(fs.createWriteStream(path));
  // })
};

const storageConfig = async (req, res, next) => {

  const arrayOfPathes = [];

  for (let i = 0; i < req.body.length; i++) {

    nameFileWithImagePath = req.body[i].imagePath;
    const bebra = nameFileWithImagePath.split('/')[2];
    console.log("nameFileWithImagePath", bebra);

    const fileName = `./images/${bebra}`;
    await downloadFileFromUrl(req.body[i].url, fileName)
      .then(() => {
        arrayOfPathes.push(fileName);
      })
      .catch(err => console.error(err));
  }
  req.arrayOfPathes = arrayOfPathes;
  next();
};

module.exports = storageConfig;