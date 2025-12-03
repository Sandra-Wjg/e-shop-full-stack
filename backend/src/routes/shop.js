const router = require("koa-router")();
const {
  getShopList,
  getShopById,
  getProductsByShopId,
} = require("../controller/shop");
const { SuccessModel, ErrorModel } = require("../res-model/index");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/shop");

// 商店列表
router.get("/hot-list", async (ctx, next) => {
  try {
    const shopList = await getShopList();
    ctx.body = new SuccessModel(shopList);
  } catch (ex) {
    ctx.body = new ErrorModel(10008, `获取商店列表失败`);
  }
});

// 单个商店信息
router.get("/:id", async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const shop = await getShopById(id);
    ctx.body = new SuccessModel(shop);
  } catch (ex) {
    ctx.body = new ErrorModel(10005, `获取商店信息失败`);
  }
});
// 获取商店的商品
router.get("/:id/products", async (ctx, next) => {
  const id = ctx.params.id;
  const tab = ctx.query.tab || "all";
  try {
    const products = await getProductsByShopId(id, tab);
    ctx.body = new SuccessModel(products);
  } catch (ex) {
    ctx.body = new ErrorModel(10006, `获取商店商品失败`);
  }
});

module.exports = router;
