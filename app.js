const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute");
const carRouter = require("./routes/carRoute");
const brandRouter = require("./routes/brandRoute");
const modelRouter = require("./routes/modelRoute");
const carImageRouter = require("./routes/carImageRoute");
const rentalRouter = require("./routes/rentalRoute");
const transactionRouter = require("./routes/transactionRoute");

app.use(express.json());
require("dotenv").config();

const cors = require("cors");
//buh domain-d API-g cors ashiglan neelttei bolgoj bn
// app.use(
//   cors({
//     origin: ["http://localhost:3306"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

app.use(cors());

app.use("/files", express.static("file"));
app.use("/carImage", express.static("file/carImages"));
app.use("/user", userRouter);
app.use("/cars", carRouter);
app.use("/brand", brandRouter);
app.use("/model", modelRouter);
app.use("/carImage", carImageRouter);
app.use("/rental", rentalRouter);
app.use("/transaction", transactionRouter);

app.listen(3000, () => {
  console.log("Application is listening in 3000 port");
});
