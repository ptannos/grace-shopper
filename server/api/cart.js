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
    });
    const products = await OrderedItem.findAll({
      where: {
        orderId: cart.id,
      },
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});

//This will add product to cart
router.put("/", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: "cart",
      },
    });
    if (!order) {
      const newOrder = await Order.create(req.body);

      const newOrderedItems = await OrderedItem.create(req.body.cartItems);
      res.send(newOrder);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

// router.put("/", requireToken, async (req, res, next) => {
//   try {

//   } catch (error) {

//   }
// })

//This will delete items from the cart
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: "cart",
      },
    });
    const product = await OrderedItem.findOne({
      where: {
        orderId: order.id,
        productId: req.params.id,
      },
    });
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});
