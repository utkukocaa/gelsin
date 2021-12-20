const config = require("./config");
const express = require("express");
const loaders = require("./loaders");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const { userRouter } = require("./routes");
const app = express();

config();
loaders();

//middlewares
app.use(express.json());
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(5000, () => {
  console.log("Server is running...");
  //   app.use("/api/products", productRouter);
});
