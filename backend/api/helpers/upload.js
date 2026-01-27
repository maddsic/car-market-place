const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "image_uploads/");
   },
   filename: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
   },
});

const imageUploader = multer({
   storage: storage,
   limits: { fileSize: 1000000 },
});

module.exports = imageUploader;
