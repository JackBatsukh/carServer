const prisma = require("../db");

exports.createTransaction = async (req, res) => {
  const { rentalID, amount, paymentMethod } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        rentalID,
        amount,
        paymentMethod,
      },
    });
    res.status(201).json({ message: "Transaction created", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction", error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { transactionID: parseInt(id) },
      include: { rental: true },
    });
    res.status(200).json({ message: "Transaction fetched", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
};
