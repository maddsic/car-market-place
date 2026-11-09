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
    transformation: [{ width: 1200, height: 900, crop: 'limit', quality: 'auto' }],
  },
});

// 2. Configure Cloudinary storage for profile images
// const profileStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'gam-autos/profiles',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     public_id: (req, file) => 'profile-' + Date.now().toString() + '-' + file.originalname.split('.')[0],
//     transformation: [{ width: 400, height: 400, crop: 'fill', quality: 'auto', gravity: 'auto' }],
//   },
// });

// const profileStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'gam-autos/profiles',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     public_id: (req, file) => {
//       const rawName = (file.originalname || 'avatar').split('.')[0];
//       const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '');
//       return `profile-${Date.now()}-${cleanName}`;
//     },
//     transformation: [{ width: 400, height: 400, crop: 'fill', quality: 'auto', gravity: 'auto' }],
//   },
// });

const path = require('path');

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Extract base name and extension cleanly
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '') || 'png';
    const rawName = path.parse(file.originalname).name || 'avatar';
    const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '');

    return {
      folder: 'gam-autos/profiles',
      resource_type: 'auto',
      // Explicitly normalize the output format to avoid MIME mismatches
      format: ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'png',
      public_id: `profile-${Date.now()}-${cleanName}`,
      transformation: [
        { width: 400, height: 400, crop: 'fill', quality: 'auto', gravity: 'auto' },
      ],
    };
  },
});
// 3. Create multer uploaders for car and profile images
const carUploader = multer({ storage: carStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
const profileUploader = multer({ storage: profileStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

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
