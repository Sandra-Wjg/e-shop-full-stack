// 登录验证中间件
async function loginCheck(ctx, next) {
  const session = ctx.session || {};
  if (session && session.userInfo) {
    await next();
    return;
  }
  ctx.body = {
    errno: -1,
    message: "未登录",
  };
}
module.exports = loginCheck;
