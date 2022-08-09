const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Databse connected successfully");
  app.listen(process.env.PORT, () => {
    console.log(`Server started at localhost:${process.env.PORT}`);
  });
});
