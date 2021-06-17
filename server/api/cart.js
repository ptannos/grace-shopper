const router = require("express").Router();
const Order = require("../db/models/order");
const OrderedItem = require("../db/models/orderedItem");
const { requireToken, isUser } = require("./gatekeepingMiddleware");

module.exports = router;

// GET api/cart

// This will check for order status rather than order Id
router.get("/", requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: "cart",
      },
      include: [{ model: OrderedItem }],
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});
