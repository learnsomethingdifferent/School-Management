const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ErrorHandler } = require("../middlewares/errorHandler.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/images";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${new Date().toISOString().replace(/:/g, "-")}-${
      file.fieldname
    }${extname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "image/gif",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(
      new ErrorHandler(
        400,
        "Only .jpeg, .jpg, .svg, .gif, or .png files are allowed"
      ),
      false
    );
  } else {
    cb(null, true);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
