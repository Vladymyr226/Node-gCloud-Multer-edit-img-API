const sharp = require("sharp");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const imgResize = async (req, file, next) => {
  console.log(req.arrayOfPathes, req.arrayWithTypes);

  const arrWithItemsForUploadToJSON = [];
  const arrayWithFileNames = [];

  const stringOfUrlNPicture = "https://storage.cloud.google.com/";

  req.arrayOfPathes.map(async (item, index) => {
    const type = req.arrayWithTypes[index];

    arrayWithFileNames.push(`${item}_128.${type}`, `${item}_250.${type}`, `${item}_512.${type}`);


    const originalPath = item + `.${type}`;

    if (type === "gif") {
      await sharp(originalPath, { animated: true })
        .resize(128, 128)
        .gif({ dither: 0 })
        .toFile(arrayWithFileNames[0]);

      await sharp(originalPath, { animated: true })
        .resize(250, 250)
        .gif({ dither: 0 })
        .toFile(arrayWithFileNames[1]);

      await sharp(originalPath, { animated: true })
        .resize(512, 512)
        .gif({ dither: 0 })
        .toFile(arrayWithFileNames[2]);
    } else if (type === "svg+xml") {
      await sharp(originalPath).png().toFile(`${item}.png`);
    } else {
      await sharp(originalPath).resize(128, 128).toFile(arrayWithFileNames[0]);
      await sharp(originalPath).resize(250, 250).toFile(arrayWithFileNames[1]);
      await sharp(originalPath).resize(512, 512).toFile(arrayWithFileNames[2]);
    }

    fs.rmSync(originalPath);
    console.log(`The original file ${originalPath} was deleted.`);


    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    const imagePathFromReq = req.body[index].imagePath;
    let nameCollectionWhereUpload = imagePathFromReq.split("/")[1];
    console.log("nameBucketWhereUpload", nameCollectionWhereUpload);


    const response = {
      id: 0,  //за фором  
      "128": stringOfUrlNPicture,
      "256": stringOfUrlNPicture,
      "512": stringOfUrlNPicture
    };

    const options = {
      destination: `/nft/${nameCollectionWhereUpload}`,
    };

    for (let i = 0; i < arrayWithFileNames.length; i++) {
      await bucket.upload(arrayWithFileNames[i], options, function (err, file) {
        if (err) throw new Error(err.message);
        // response[128] += arrayWithFileNames[i];
      });
    }

    // arrWithItemsForUploadToJSON.push();
  });

  next();
};

module.exports = imgResize;

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the environment.

//////*************************************************************** */
//const storage = new Storage();

// async function createBucket() {
//     const bucketName = "bebra"
//     // Creates the new bucket
//     await storage.createBucket(bucketName);
//     console.log(`Bucket ${bucketName} created.`);
//   }

//   createBucket().catch(console.error);

//     // Create a new blob in the bucket and upload the file data.
//   const blob = bucket.file(req.file.originalname);
//   const blobStream = blob.createWriteStream();

//   blobStream.on('error', err => {
//     next(err);
//   });

//   blobStream.on('finish', () => {
//     // The public URL can be used to directly access the file via HTTP.
//     const publicUrl = format(
//       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//     );
//     res.status(200).send(publicUrl);
//   });

//   blobStream.end(req.file.buffer);
//////*************************************************************** */


// async function listBuckets() {
    //   try {
    //     const results = await storage.getBuckets();

    //     const [buckets] = results;

    //     console.log('Buckets:');
    //     buckets.forEach(bucket => {
    //       console.log(bucket.name);
    //     });
    //   } catch (err) {
    //     console.error('ERROR:', err.message);
    //   }
    // }
    // listBuckets();