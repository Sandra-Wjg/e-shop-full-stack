// user controller
const User = require("../models/User");

async function register(username, password) {
  const newUser = await User.create({ username, password });
  return newUser;
}
module.exports = {
  register,
};
