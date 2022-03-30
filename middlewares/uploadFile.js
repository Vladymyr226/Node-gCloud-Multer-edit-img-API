const fileFilter = (req, res, cb, next) => {
// const fileFilter = (req, cb, next) => {


    // console.log(req.file, "\treq.file");
    if (req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpg" ||
        req.file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
    next()
}

module.exports = fileFilter;