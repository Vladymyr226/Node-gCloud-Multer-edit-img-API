const sharp = require("sharp")
const fs = require("fs")
const { Storage } = require("@google-cloud/storage")

const imgResize = async (req, file, next) => {
  console.log(req.arrayOfPathes, req.arrayWithTypes)

  req.arrayOfPathes.map(async (item, index) => {
    // const extension = [item?.mimetype].toString()
    const type = req.arrayWithTypes[index]

    const originalPath = item + `.${type}`

    if (type === "gif") {
      await sharp(originalPath, { animated: true })
        .resize(128, 128)
        .gif({ dither: 0 })
        .toFile(`${item}_128.${type}`)

      await sharp(originalPath, { animated: true })
        .resize(250, 250)
        .gif({ dither: 0 })
        .toFile(`${item}_250.${type}`)

      await sharp(originalPath, { animated: true })
        .resize(512, 512)
        .gif({ dither: 0 })
        .toFile(`${item}_512.${type}`)
    } else if (type === "svg+xml") {
      await sharp(originalPath).png().toFile(`${item}${Date.now()}.png`)
    } else {
      await sharp(originalPath).resize(128, 128).toFile(`${item}_128.${type}`)
      await sharp(originalPath).resize(250, 250).toFile(`${item}_250.${type}`)
      await sharp(originalPath).resize(512, 512).toFile(`${item}_512.${type}`)
    }

    await fs.rm(originalPath, () => {
      console.log(`The original file ${originalPath} was deleted.`)
    })
    //TODO
    //загружать эти файлы котоорые на этой итерации
    //если они успешно загрузились - удалить их локально на этой итерации

    // const storage = new Storage()

    // const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)

    // await bucket.upload(file.req.file.path, function (err, file) {
    //   if (err) throw new Error(err.message)
    // })
  })

  next()
}

module.exports = imgResize

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the environment.

//const storage = new Storage();

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
//////*************************************************************** */

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
