// Helper to safely format both old local images and new Cloudinary URLs
const formatUrl = (url, folder = '') => {
  if (!url) return null;
  // If it's already a full Cloudinary URL, keep it as-is!
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Fallback for old local files during development
  return `${process.env.BASE_URL}/image_uploads/${folder}${url}`;
};

const processCarImages = cars => {
  return Promise.all(
    cars.map(async car => {
      const data = typeof car.toJSON === 'function' ? car.toJSON() : car;
      return {
        ...data,
        image: formatUrl(data.imageUrl),
        images: data.images
          ? data.images.map(img => ({
            ...img,
            imageUrl: formatUrl(img.imageUrl),
          }))
          : [],
      };
    })
  );
};

const processProfileImage = user => {
  if (!user) return null;

  const data = typeof user.toJSON === 'function' ? user.toJSON() : user;
  return {
    ...data,
    avatarUrl: formatUrl(data.avatarUrl, 'profiles/'),
  };
};

module.exports = { processCarImages, processProfileImage };

































// const processCarImages = cars => {
//   return Promise.all(
//     cars.map(async car => {
//       const data = typeof car.toJSON === 'function' ? car.toJSON() : car;
//       return {
//         ...data,
//         image: data.imageUrl
//           ? `${process.env.BASE_URL}/image_uploads/${data.imageUrl}`
//           : null,

//         images: data.images
//           ? data.images.map(img => ({
//             ...img,
//             imageUrl: `${process.env.BASE_URL}/image_uploads/${img.imageUrl}`,
//           }))
//           : [],
//       };
//     })
//   );
// };


// const processProfileImage = user => {
//   if (!user) return null;

//   const data = typeof user.toJSON === 'function' ? user.toJSON() : user;
//   return {
//     ...data,
//     avatarUrl: data.avatarUrl
//       ? `${process.env.BASE_URL}/image_uploads/profiles/${data.avatarUrl}`
//       : null,
//   };
// }

// module.exports = { processCarImages, processProfileImage };
