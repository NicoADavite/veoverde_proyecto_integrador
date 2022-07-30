const multer = require('multer');
const path = require('path');

const multerMiddleware = (folder, entity) => {
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            const folderPath = path.join(__dirname, `../../public/images/${folder}`)
            cb(null, folderPath);
        },
        filename: (req,file,cb) => {
            const newFileName = `${entity}_img_${Date.now()}${path.extname(file.originalname)}`;
            cb(null, newFileName);
        }
    })

    return multer({ storage });
}

module.exports = multerMiddleware;
