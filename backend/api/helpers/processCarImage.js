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

// exports.processCarImages = (cars) => {
//   return Promise.all(
//     cars.map(async (car) => {
//       const plaincarData =
//         typeof car.toJSON === "function" ? car.toJSON() : car;

//       const imgPath = path.join(__dirname, "../../image_uploads", car.imageUrl);
//       const base64Image = await convertImageToBase64(imgPath);

//       return {
//         ...plaincarData,
//         imageUrl: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
//       };
//     })
//   );
// };

export const processCarImages = (cars) => {
  return Promise.all(
    cars.map(async (car) => {
      const data = typeof car.toJSON === "function" ? car.toJSON() : car;
      return {
        ...data,
        image: data.imageUrl
          ? `${process.env.BASE_URL}/image_uploads/${data.imageUrl}`
          : null,

        images: data.images
          ? data.images.map((img) => ({
              ...img,
              imageUrl: `${process.env.BASE_URL}/image_uploads/${img.imageUrl}`,
            }))
          : [],
      };
    })
  );
};
