const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/svg+xml" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/gif") {
        cb(null, true);
    }
    else {
        cb(null, true);
    }
}

module.exports = fileFilter;