const prisma = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Хэрэглэгч бүртгэлтэй байна." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const users = await prisma.users.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ message: "Амжилттай бүртгэгдлээ!" });
  } catch (error) {
    console.error("Хэрэглэгч бүртгэхэд алдаа гарлаа.", error);
    return res.status(400).json({ message: "алдаа гарлаа" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await prisma.users.findUnique({ where: { email } });
    if (!users) {
      return res
        .status(401)
        .json({ message: "Хэрэглэгч олдсонгүй, нэвтрэх Email шалгана уу! " });
    }
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Нууц үг буруу байна!" });
    }
    const token = jwt.sign({ UserID: users.userID }, process.env.JWT_token, {
      expiresIn: "5h",
    });
    return res.status(200).json({ message: "Амжилттай нэвтэрлээ", token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Нэвтрэхэд алдаа гарлаa" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { address, firstName, lastName, email, phone, password } = req.body;
    const files = req.files;

    const identityImage = files.identityImage?.[0]?.filename;
    const licenseImage = files.licenseImage?.[0]?.filename;

    const updateData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      address: address || undefined,
      identityImage: identityImage || undefined,
      licenseImage: licenseImage || undefined,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedUser = await prisma.users.update({
      where: { userID: req.user.userID },
      data: updateData,
    });

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: { userID: parseInt(id) },
    });
    res.status(200).json({ message: "Хэрэглэгч bye bye Гагарин боллоо." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Алдаа гарлаа", error });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const user = await prisma.users.findMany();
    res.status(200).json({
      message: "Амжилттай авчирлаа",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Алдаа гарлаа",
    });
  }
};
