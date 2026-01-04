const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connectDB.js");

const collectionsRouter = require("./routers/collectionsRouter.js");
const requestsRouter = require("./routers/requestsRouter.js");


const errorHandlerMiddleware = require("./middleware/error-handler.js");
const notFoundMiddleware = require("./middleware/not-found.js");


const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.static("./public"));


// routes
app.use("/api/v1/collections", collectionsRouter);
app.use("/api/v1/requests", requestsRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, () => {
      console.log("Server is running on PORT " + PORT + "...");
    });

  } catch (err) {
    console.log(err);
  }
}
start();
