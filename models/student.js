const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const UPLOAD_Path = path.join("/upload/student/profile");

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: Number,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", UPLOAD_Path));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


studentSchema.statics.uploadedFiles = multer({
  storage: storage,
}).single("avatar");
studentSchema.statics.filePath = UPLOAD_Path;


const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
