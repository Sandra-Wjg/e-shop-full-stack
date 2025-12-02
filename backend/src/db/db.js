// 链接数据库
const mogoose = require("mongoose");
const url = "mongodb://localhost:27017";
const dbName = "eShopDB";

mogoose.connect(`${url}/${dbName}`, {});

const conn = mogoose.connection;

conn.on("error", function (err) {
  console.log("数据库连接失败");
  throw err;
});

conn.once("open", function () {
  console.log("数据库连接成功");
});

module.exports = mogoose;
