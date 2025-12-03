const { ErrorModel } = require("../res-model/index");
// 登录验证中间件
async function loginCheck(ctx, next) {
  const session = ctx.session || {};
  if (session && session.userInfo) {
    await next();
    return;
  }
  ctx.body = new ErrorModel(10003, "未登录");
}
module.exports = loginCheck;
