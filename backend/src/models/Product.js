const mongoose = require("../db/db");

const Schema = mongoose.Schema(
  {
    shopId: {
      type: String,
      require: true,
    },
    name: String,
    imgUrl: String,
    sales: Number,
    price: Number,
    oldPrice: Number,
    tabs: [String], //示例 tabs:['all','seckill']
  },
  { timestamps: true }
);

const Product = mongoose.model("product", Schema);

module.exports = Product;
