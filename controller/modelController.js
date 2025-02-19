const prisma = require("../db/index");

exports.createModel = async (req, res) => {
  const { modelName, brandName } = req.body;
  try {
    const brand = await prisma.brand.findUnique({ where: { brandName } });
    if (!brand) return res.status(404).json({ error: "Brand not found" });

    const model = await prisma.model.create({
      data: { modelName, brandName },
    });
    res.status(200).json({ message: "Success", model });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};
