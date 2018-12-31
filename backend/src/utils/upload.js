const multer  = require('multer');

const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || 'uploads/';
const SITE_URL = process.env.SITE_URL || 'http://localhost/';
const STATIC_PATH = process.env.STATIC_PATH || 'static/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    let extension = file.originalname.split('.');
    extension = extension[extension.length - 1];
    const filename = `user${req.user.data.id}.${extension}`;
    file.url = `${SITE_URL}${STATIC_PATH}${filename}`;
    cb(null, filename);
  }
});

module.exports = multer({
  storage,
  limits: { fileSize: 500000 },
  fileFilter: (req, file, cb) => {
    if (/^image/.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false, 'Not an image');
    }
  }
}).single('file');