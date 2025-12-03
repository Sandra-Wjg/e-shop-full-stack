// address controller
const Address = require("../models/Address");

async function createAddress(username, data) {
  const newAddress = await Address.create({ username, ...data });
  return newAddress;
}
async function getAddressList(username) {
  const addressList = await Address.find({ username }).sort({ updatedAt: -1 });
  return addressList;
}
async function getAddressById(id) {
  const address = await Address.findById(id);
  return address;
}
module.exports = {
  createAddress,
  getAddressList,
  getAddressById,
};
