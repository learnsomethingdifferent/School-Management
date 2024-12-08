const mongoose = require("mongoose");
require("dotenv").config();

class DB {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  }
}

module.exports = new DB();
