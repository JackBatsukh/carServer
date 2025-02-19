const prisma = require("../db");

exports.createRental = async (req, res) => {
  const { carID, startDate, endDate, totalCost } = req.body;
  const userID = req.user.UserID; // Assuming auth middleware adds user to req

  try {
    const rental = await prisma.rental.create({
      data: {
        userID,
        carID,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCost,
        paymentStatus: "pending",
      },
    });
    res.status(201).json({ message: "Rental created", rental });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating rental", error: error.message });
  }
};

exports.getRentalsByUser = async (req, res) => {
  const userID = req.user.UserID;

  try {
    const rentals = await prisma.rental.findMany({
      where: { userID },
      include: { car: true },
    });
    res.status(200).json({ message: "Rentals fetched", rentals });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rentals", error: error.message });
  }
};

exports.updateRental = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  try {
    const rental = await prisma.rental.update({
      where: { rentalID: parseInt(id) },
      data: { paymentStatus },
    });
    res.status(200).json({ message: "Rental updated", rental });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating rental", error: error.message });
  }
};

exports.deleteRental = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.rental.delete({ where: { rentalID: parseInt(id) } });
    res.status(200).json({ message: "Rental deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting rental", error: error.message });
  }
};
