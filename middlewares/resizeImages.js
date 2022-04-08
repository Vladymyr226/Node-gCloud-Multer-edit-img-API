const sharp = require('sharp');

const imgResize = async (req, file, next) => {
    // console.log(req);

    const extension = [file.req.file?.mimetype].toString();
    const type = extension.split("/")[1];

    if (file.req.file?.path) {

        if (type === "gif") {
            await sharp(file.req.file.path, { animated: true })
                .resize(128, 128)
                .gif({ dither: 0 })
                .toFile(`${file.req.file.destination}/edt${Date.now()}.${type}`);

            await sharp(file.req.file.path, { animated: true })
                .resize(250, 250)
                .gif({ dither: 0 })
                .toFile(`${file.req.file.destination}/edt${Date.now()}.${type}`);

            await sharp(file.req.file.path, { animated: true })
                .resize(512, 512)
                .gif({ dither: 0 })
                .toFile(`${file.req.file.destination}/edt${Date.now()}.${type}`);
        }
        else if (type === "svg+xml") {
            await sharp(file.req.file.path).png().toFile(`${file.req.file.destination}/edt${Date.now()}.png`);
        }
        else {
            await sharp(file.req.file.path).resize(128, 128).toFile(`${file.req.file.destination}/edt${Date.now()}.${type}`);
            await sharp(file.req.file.path).resize(250, 250).toFile(`${file.req.file.destination}/edt${Date.now()}.${type}`);
            await sharp(file.req.file.path).resize(512, 512).toFile(`${file.req.file.destination}/edt${Date.now()}.${type}`);
        }

        next();
    }
    else console.log(" "); next();
}

module.exports = imgResize;