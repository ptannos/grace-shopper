const router = require("express").Router();
const Order = require("../db/models/order");
const Product = require("../db/models/product");
//const { requireToken, isUser } = require("./gatekeepingMiddleware");

module.exports = router;

// GET api/cart

// This will check for order status rather than order Id
router.get("/", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        //userId: req.user.id,
        status: "cart",
      },
      include: [{ model: Product }],
    });

    res.send(cart);
  } catch (err) {
    next(err);
  }
});
