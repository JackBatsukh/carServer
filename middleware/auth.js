// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token)
//     return res.status(401).json({ message: "Authentication required" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_TOKEN);
//     req.user = decoded; // Contains UserID from token
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: "Хүчингүй токен" });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res
      .status(401)
      .json({ message: "Хүсэлт цуцлагдлаа, токен шалгана уу!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Hucingui token" });
  }
};
