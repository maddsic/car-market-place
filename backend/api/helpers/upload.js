const multer = require('multer');
const path = require('path');
const fs = require('fs');

const carStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'image_uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  },
});

const profileStorage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'image_uploads/profiles/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, 'profile-' + Date.now().toString() + path.extname(file.originalname));
  }
})

const carUploader = multer({ storage: carStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
const profileUploader = multer({ storage: profileStorage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB limit

module.exports = {
  carUploader,
  profileUploader,
};
