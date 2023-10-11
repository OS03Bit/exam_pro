const User = require("../models/user");
const Student = require("../models/student");
module.exports.dashboard = function (req, res) {
  return res.render("admin", {
    title: "Dashboard",
  });
};

module.exports.create = async (req, res) => {
  try {
    // Student.uploadedFiles(req, res, async function (error) {
    //   if (error) {
    //     console.log("**** Multer error :", error);
    //   }
    //   let user = await User.findOne({ username: req.body.username });
    //   if (!user) {
    //     await User.create({
    //       username: req.body.username,
    //       password: req.body.password,
    //       usertype: "student",
    //     });
    //   }
    //   async function load_file() {
    //     let path_a = Student.filePath + "/" + req.file.filename + ".jpg";
    //     await Student.create({ username: req.body.username, avatar: path_a });
    //   }

    //   await load_file();
    //   return res.redirect("back");
    // });
      let noti = Student.uploadedFiles(req, res, async function (error) {
        if (error) {
          console.log("** Multer error:", error);
        }
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
          await User.create({
            username: req.body.username,
            password: req.body.password,
            usertype: "student",
          });
          let path_a = Student.filePath + "/" + req.file.filename;
          await Student.create({ username: req.body.username, avatar: path_a });
        }
      });
    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.log(err);
  }
};
