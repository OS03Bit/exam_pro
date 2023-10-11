const User = require("../models/user");
const util = require("util");
module.exports.home = function (req, res) {
  return res.redirect("/Login");
};

module.exports.Login = function (req, res) {
  return res.render("login", {
    title: "Login",
  });
};

module.exports.createSession = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("hiii");
    let user = await User.findOne({ username: username });
    if (!user) {
      return res.redirect("back");
    } else {
      console.log(user);
      if (user.password !== password) {
        return res.redirect("back");
      }
      if (user.usertype === "student") {
        return res.redirect("/student/dashboard");
      } else if (user.usertype === "admin") {
        console.log("admin");
        return res.redirect("/admin/dashboard");
      } else {
        return res.redirect("/");
      }
    }
    
  } catch (error) {}
};
module.exports.destroySession = async function (req, res) {

  // logout has been upgraded as an asynchronous function so it requires a callback function to handle error now
  const logoutPromise = util.promisify(req.logout);
  await logoutPromise.call(req);

  return res.redirect("/");
};