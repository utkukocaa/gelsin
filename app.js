const config = require("./config");
const express = require("express");
const loaders = require("./loaders");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const { userRouter, productRouter } = require("./routes");
const events = require("./scripts/events");
const app = express();

config();
loaders();
events();

//middlewares
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(5000, () => {
  console.log("Server is running...");
  //   app.use("/api/products", productRouter);
});
