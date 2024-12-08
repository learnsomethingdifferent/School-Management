const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db.js");
const { handleError } = require("../backend/middlewares/errorHandler.js");
const authRoute = require("../backend/routes/authRoutes.js");
const userRoute = require("../backend/routes/userRoutes.js");
const classRoute = require("../backend/routes/classRoutes.js");
const subjectRoute = require("../backend/routes/subjectRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling
app.use((err, req, res, next) => {
  handleError(err, res);
});

// routes cononections
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/class", classRoute);
app.use("/api/subject", subjectRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
