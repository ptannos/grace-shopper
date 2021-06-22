const router = require("express").Router();
const Order = require("../db/models/order");
const Product = require("../db/models/product");
const { requireToken } = require("./gatekeepingMiddleware");

module.exports = router;

// GET api/cart - retrieve logged-in user's order with "cart" status
router.get("/", requireToken, async (req, res, next) => {
  try {
    const cartOrder = await Order.findCartOrder(req.user.id);
    res.send(cartOrder);
  } catch (err) {
    next(err);
  }
});

// PUT api/cart - saves logged-in user's order to db
router.put("/", requireToken, async (req, res, next) => {
  try {
    console.log("REQ.BODY IN CART PUT ROUTE >>>>>>> ", req.body);
    //const products = req.body.cartItems || [];
    //const order = await Order.findCartOrder(req.user.id);
    //console.log("ORDER IN PUT ROUTE: ", order);
    // if (!order) {
    //   const newCart = await Order.create(req.body);
    //   await newCart.addProductsToOrder(products);
    //   res.send(newCart);
    // } else {
    //   const updatedCart = await order.update(req.body, order);
    //   res.send(updatedCart);
    // }
  } catch (err) {
    next(err);
  }
});
