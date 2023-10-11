const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//add B.TEch, Phd, TG name @OM/@Raj
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
