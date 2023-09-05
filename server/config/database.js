/** @format */
//import the library
const mongoose = require("mongoose");
require("dotenv").config();

//export the function
exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected successfully ✔")) //if connection is successful
    .catch((error) => {
      console.error("DB Connection Error 🛠: "); //if connection is unsuccessful
      console.error(error);
      process.exit(1); //exit the process if connection is unsuccessful
    });
};
