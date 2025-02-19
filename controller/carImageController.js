const prisma = require("../db/index");

exports.uploadImage = async (req, res) => {
  const { carID } = req.body;
  try {
    const images = await Promise.all(
      req.files.map((file) =>
        prisma.carImages.create({
          data: { carID: parseInt(carID), image: file.filename },
        })
      )
    );
    res.status(200).json({ message: "Images uploaded", images });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};
