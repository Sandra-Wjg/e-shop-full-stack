const router = require("koa-router")();
const {
  createAddress,
  getAddressList,
  getAddressById,
} = require("../controller/address");
const { SuccessModel, ErrorModel } = require("../res-model/index");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/user/address");

// 创建收货地址
router.post("/", loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const data = ctx.request.body;
  try {
    const newAddress = await createAddress(userInfo.username, data);
    ctx.body = new SuccessModel(newAddress);
  } catch (ex) {
    ctx.body = new ErrorModel(10004, `创建收货地址失败`);
  }
});

// 获取收货地址列表
router.get("/", loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  try {
    const addressList = await getAddressList(userInfo.username);
    ctx.body = new SuccessModel(addressList);
  } catch (ex) {
    ctx.body = new ErrorModel(10005, `获取收货地址列表失败`);
  }
});
// 获取单个收货地址
router.get("/:id", loginCheck, async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const address = await getAddressById(id);
    ctx.body = new SuccessModel(address);
  } catch (ex) {
    ctx.body = new ErrorModel(10006, `获取收货地址失败`);
  }
});
// 更新收货地址

module.exports = router;
