const router = require("express").Router();
const {
  models: { Order, Product },
} = require("../db");
const { requireToken, hasToken } = require("./gatekeepingMiddleware");
module.exports = router;

// GET all orders & all the products in each order
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Product }],
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// GET a specific order w/ all the products in the order
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// PUT in an order - create or update
// If updating, we need pre-existing orderId
router.put("/", async (req, res, next) => {
  try {
    // grab cartItems from req.body
    const products = req.body.products || [];
    if (req.user) {
      const order = await Order.findCartOrder(req.user.id);
      console.log("THIS IS ORDER FOR REQ.USER >>>>> ", order);
      await order.update(req.body);
      await order.addProductsToOrder(products);
      res.send(order);
    } else {
      const newOrder = await Order.create(req.body);
      await newOrder.addProductsToOrder(products);
      res.send(newOrder);
    }
  } catch (err) {
    next(err);
  }
});

// PUT in a new order to purchase
// router.put("/", async (req, res, next) => {
//   try {
//     const order = await Order.create(req.body);
//     res.send(order);
//     // let order = await Order.findOne({
//     //   where: {
//     //     userId: req.user.id,
//     //   },
//     // });
//     // if (order) {
//     //   order.status = "purchased"
//     // } else {
//     //   const {  } = req.body
//     //   const newOrder = await Order.create({

//     //   });

//     //}
//   } catch (err) {
//     next(err);
//   }
// });

/*
req.body:
{
  totalPrice: 50
  totalQty: 3
  recipient: "Grace Hopper"
  shippingAddress: "123 ABC St"
  status: "purchased"
  products: [...cartItems]
}
*/
