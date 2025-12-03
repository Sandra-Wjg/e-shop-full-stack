// shop controller
const Order = require("../models/Shop");
const Product = require("../models/Product");
const Address = require("../models/Address");

async function createOrder(username, data) {
  const {
    addressId,
    shopId,
    shopName,
    isCanceled = false, //默认值 false
    products = [], //默认值
  } = data;
  const address = await Address.findById(addressId);
  const pIds = products.map((p) => p.id); // 格式如['商品1-id','商品2-id']
  const productList = await Product.find({
    shopId: shopId,
    _id: { $in: pIds },
  });

  // 拼接上购买数量
  const productListWithSales = productList.map((p) => {
    // 商品 id
    const id = p._id.toString();
    // 通过商品 id 可以找到销售数量
    const filterProducts = products.filter((item) => item.id === id);
    if (filterProducts.length === 0) {
      // 没有找到匹配的数量，报错
      throw new Error("未找到匹配的销量数据");
    }
    return {
      orderSales: filterProducts[0].num,
      product: {
        shopId: p.shopId,
        name: p.name,
        imgUrl: p.imgUrl,
        sales: p.sales,
        price: p.price,
        oldPrice: p.oldPrice,
      },
    };
  });
  // 创建订单
  const newOrder = await Order.create({
    username,
    shopId,
    shopName,
    isCanceled,
    products: productListWithSales,
    address: {
      username: address.username,
      city: address.city,
      department: address.department,
      houseNumber: address.houseNumber,
      name: address.name,
      phone: address.phone,
    },
  });
  return newOrder;
}

async function getOrderList(username) {
  const orderList = await Order.find({ username }).sort({ _id: -1 });
  return orderList;
}

module.exports = {
  createOrder,
  getOrderList,
};
