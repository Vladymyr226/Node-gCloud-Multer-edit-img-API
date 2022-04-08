const { Storage } = require("@google-cloud/storage");

const saveFileToStorage = async (req, file, next) => {

    // Instantiates a client. If you don't specify credentials when constructing
    // the client, the client library will look for credentials in the environment.

    const storage = new Storage();

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


    // const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    // await bucket.upload(file.req.file.path, function (err, file) {
    //     if (err) throw new Error(err.message);
    // });


    next();
}

module.exports = saveFileToStorage;