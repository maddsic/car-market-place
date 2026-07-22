const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');


// 1. Configure Cloudinary storage for car images
const carStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gam-autos/cars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => 'car-' + Date.now().toString() + '-' + file.originalname.split('.')[0],
    // transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

// 2. Configure Cloudinary storage for profile images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gam-autos/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => 'profile-' + Date.now().toString() + '-' + file.originalname.split('.')[0],
    // transformation: [{ width: 400, height: 400, crop: 'limit' }],
  },
});

// 3. Create multer uploaders for car and profile images
const carUploader = multer({ storage: carStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
const profileUploader = multer({ storage: profileStorage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB limit

module.exports = {
  carUploader,
  profileUploader,
};














// const carStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'image_uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now().toString() + path.extname(file.originalname));
//   },
// });

// const profileStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     const dir = 'image_uploads/profiles/';
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//     cb(null, dir);
//   },
//   filename(req, file, cb) {
//     cb(null, 'profile-' + Date.now().toString() + path.extname(file.originalname));
//   }
// })

// const carUploader = multer({ storage: carStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
// const profileUploader = multer({ storage: profileStorage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB limit

// module.exports = {
//   carUploader,
//   profileUploader,
// };
