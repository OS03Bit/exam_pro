const Student = require("../models/student");
module.exports.dashboard = async function  (req, res) {
  let student = await Student.findOne({username: res.locals.user.username});
  return res.render("student", {
    title: "Dashboard", student
  });
};
