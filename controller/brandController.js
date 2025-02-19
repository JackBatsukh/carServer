const prisma = require("../db/index");

exports.createBrand = async (req, res) => {
  const { brandName } = req.body;
  try {
    const brand = await prisma.brand.create({
      data: {
        brandName,
      },
    });
    res.status(200).json({
      message: "Амжилттай хадгаллаа",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
