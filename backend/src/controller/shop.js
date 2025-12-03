// shop controller
const Shop = require("../models/Shop");
const Product = require("../models/Product");

async function getShopList() {
  const shopList = await Shop.find().sort({ _id: -1 });
  return shopList;
}
async function getShopById(id) {
  const shop = await Shop.findById(id);
  return shop;
}
async function getProductsByShopId(shopId, tab = "all") {
  const products = await Product.find({ shopId, tabs: { $in: tab } }).sort({
    _id: -1,
  });
  return products;
}

module.exports = {
  getShopList,
  getShopById,
  getProductsByShopId,
};
