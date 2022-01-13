const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, '../public/images/users');
    },
    filename: (req,file,cb) => {
        newFileName = `${Date.now()}_img_${path.extname(file.originalname)}`;
        cb(null, newFileName);
    }
});
const upload = multer({ storage });

module.exports = upload;