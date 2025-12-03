const router = require("koa-router")();
const { register, login } = require("../controller/user");
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

// 用户登录
router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const res = await login(username, password);
  if (res) {
    // 设置session
    ctx.session.userInfo = { username };
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel(10002, `登录失败: 用户名或密码错误`);
  }
});

module.exports = router;
