const path = require("path");
const fs = require("fs").promises;

const convertImageToBase64 = async (imagePath) => {
  try {
    const imgBuffer = await fs.readFile(imagePath);
    return imgBuffer.toString("base64");
  } catch (error) {
    console.log(`ERROR READING IMAGE: ${error.message}`);
    return null;
  }
};

exports.processCarImages = (cars) => {
  return Promise.all(
    cars.map(async (car) => {
      const plaincarData =
        typeof car.toJSON === "function" ? car.toJSON() : car;

      const imgPath = path.join(__dirname, "../../image_uploads", car.imageUrl);
      const base64Image = await convertImageToBase64(imgPath);

      return {
        ...plaincarData,
        imageUrl: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
      };
    })
  );
};

// exports.processCarImages = (cars, req) => {
//   // Define the base URL for static files, matching the Express static route '/images'.
//   const STATIC_FILES_BASE_URL = `${req.protocol}://${req.get("host")}/images/`;

//   // We no longer need to use Promise.all or async/await
//   // because we are only performing synchronous string manipulation.
//   return cars.map((car) => {
//     // Safely convert to a plain object if Sequelize instance is passed
//     const plaincarData = typeof car.toJSON === "function" ? car.toJSON() : car;

//     const filename = plaincarData.imageUrl;

//     // Construct the full, absolute URL
//     const publicImageUrl = filename
//       ? `${STATIC_FILES_BASE_URL}${filename}`
//       : null;

//     return {
//       ...plaincarData,
//       // Return the direct URL instead of the Base64 data string
//       imageUrl: publicImageUrl,
//     };
//   });
//   // NOTE: This function no longer returns a Promise unless you explicitly re-wrap it.
//   // We return a simple array now, so update any calls to this function accordingly.
// };
