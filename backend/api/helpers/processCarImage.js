
const processCarImages = (cars) => {
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

module.exports = { processCarImages };
