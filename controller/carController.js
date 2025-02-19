const { parse } = require("dotenv");
const prisma = require("../db");

exports.createCar = async (req, res) => {
  const {
    brandName,
    modelName,
    price,
    color,
    type,
    seats,
    engine,
    roadLimit,
    fuelCapacity,
    images,
  } = req.body;
  try {
    const car = await prisma.cars.create({
      data: {
        brandName,
        modelName,
        price: parseInt(price),
        color,
        type,
        seats: parseInt(seats),
        engine,
        roadLimit: parseInt(roadLimit),
        fuelCapacity: parseInt(fuelCapacity),
        images: {
          create: images.map((image) => ({ image: image.filename })),
        },
      },
      include: { images: true },
    });
    res.status(200).json({
      message: "Амжилттай хадгаллаа",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};

exports.allCars = async (req, res) => {
  try {
    const car = await prisma.cars.findMany();
    res.status(200).json({
      message: "Амжилттай авчирлаа",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = prisma.cars.findUnique({
      where: {
        carID: parseInt(id),
      },
    });
    if (!car) {
      return res.status(404).json({
        message: "Машин олдсонгүй",
      });
    }
    res.status(200).json({
      message: "Амжилттай авчирлаа",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};

exports.getCarByBrand = async (req, res) => {
  const { brandName } = req.params;
  try {
    const cars = await prisma.cars.findMany({
      where: { brandName },
      // include: { images: true },
    });

    res.status(200).json({
      message: "Амжилттай",
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};


exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const {
    brandName,
    modelName,
    price,
    color,
    type,
    seats,
    engine,
    roadLimit,
    fuelCapacity,
    images,
  } = req.body;
  try {
    const car = prisma.cars.update({
      where: {
        carID: parseInt(id),
      },
      data: {
        brandName,
        modelName,
        price,
        color,
        type,
        seats,
        engine,
        roadLimit,
        fuelCapacity,
        images,
      },
    });
    res.status(200).json({
      message: "Амжилттай хадгаллаа",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
      error,
    });
  }
};
