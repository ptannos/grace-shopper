const router = require("express").Router();
const Order = require("../db/models/order");
const OrderedItem = require('../db/models/orderedItem');
const Product = require("../db/models/product");
const { requireToken, isUser } = require("./gatekeepingMiddleware");

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

// PUT api/cart - add or increment product in User cart
router.put("/:productId", requireToken, async(req,res,next) => {
  try {
    //console.log("REQ.BODY IN PUT ROUTE: ", req.body)
    // find existing cart
    const cart = await Order.findCartOrder(req.user.id)
    // if cart exists, we're going to update the target product & increment++
    //console.log("CART IN PUT ROUTE: ", cart)
    if (cart) {
      // find target product on the cart
      const product = await OrderedItem.findOne({
        where: {
          orderId: cart.id,
          productId: req.body.id
        }
      })
      await product.update(req.body.product)
      //await product.itemQty++
      res.send(product)
    }
    // if cart doesn't exist, create newOrder with corresponding product
    // send back updated product info
    // if (cart) {
    //   const updatedCart = await cart.update(req.body, cart)
    //   res.send(updatedCart)
    // } else {
    //   const products = req.body.products || []
    //   const newCart = await Order.create(req.body)
    //   await newCart.addProductsToOrder(products)
    //   res.send(newCart)
    // }
  } catch (err) {
    next(err)
  }
})

// DELETE api/cart - either decrement or delete product from User cart
router.delete("/:productId", requireToken, async(req,res,next) => {
  try {
    // find the cart
    const cart = await Order.findCartOrder(req.user.id)
    // find the product matching the product in req.body
    const product = await OrderedItem.findOne({
      where: {
        orderId: cart.id,
        productId: req.params.id
      }
    })
    // if product.itemQty > 1, product.itemQty--
    if (product.itemQty > 1) product.itemQty--
    // if product.itemQty <= 1, destroy
    else await product.destroy()
    res.send(product)
  } catch(err) {
    next(err)
  }
})
