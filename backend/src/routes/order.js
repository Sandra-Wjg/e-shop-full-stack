const router = require("koa-router")();
const { createOrder, getOrderList } = require("../controller/order");
const { SuccessModel, ErrorModel } = require("../res-model/index");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/order");

// 创建订单
router.post("/", loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const data = ctx.request.body;
  try {
    const newOrder = await createOrder(userInfo.username, data);
    ctx.body = new SuccessModel(newOrder);
  } catch (ex) {
    ctx.body = new ErrorModel(10008, `创建订单失败`);
  }
});

// 显示订单列表
router.get("/", loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  try {
    const orderList = await getOrderList(userInfo.username);
    ctx.body = new SuccessModel(orderList);
  } catch (ex) {
    ctx.body = new ErrorModel(10005, `获取订单列表失败`);
  }
});

module.exports = router;
