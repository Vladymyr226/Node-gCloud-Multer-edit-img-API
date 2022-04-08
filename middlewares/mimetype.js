const execSync = require("child_process").execSync;
const fs = require("fs")

const getMimeFromPath = (filePath) => {
    const mimeType = execSync('file --mime-type -b "' + filePath + '"').toString();
    return mimeType.trim();
}

const getMimetype = (req, res, next) => {

    // console.log("arrayOfPathes\t", req.arrayOfPathes, "\n")

    req.arrayOfPathes.map((item, index) => {

        // console.log("item: ", item)

        let tmp = getMimeFromPath(req.arrayOfPathes[index])
        let arr = tmp.split('/')[1]

        //console.log("ext\t", arr)

        fs.rename(item, item + `.${arr}`, (err) => {
            if (err) throw err;
            // console.log('Rename complete!');
        });
    })

    next();
}

module.exports = getMimetype;