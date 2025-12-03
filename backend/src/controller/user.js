// user controller
const User = require("../models/User");

async function register(username, password) {
  const newUser = await User.create({ username, password });
  return newUser;
}
async function login(username, password) {
  const user = await User.findOne({ username, password });
  if (user !== null) {
    return true;
  }
  return false;
}
module.exports = {
  register,
  login,
};
