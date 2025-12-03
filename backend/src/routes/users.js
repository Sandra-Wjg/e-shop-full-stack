const router = require("koa-router")();
const { register } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../res-model/index");

router.prefix("/api/user");

// 用户注册
router.post("/register", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  try {
    const newUser = await register(username, password);
    ctx.body = new SuccessModel(newUser);
  } catch (ex) {
    ctx.body = new ErrorModel(10001, `注册失败: ${ex.message}`);
  }
});

module.exports = router;
