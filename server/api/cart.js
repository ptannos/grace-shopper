const router = require("express").Router()
const {
  models: { Order },
} = require("../db")
const OrderedItem = require("../db/models/orderedItem")
const { requireToken } = require("./gatekeepingMiddleware")

module.exports = router

// GET /api/cart - retrieve logged-in user's order with "cart" status
router.get("/", requireToken, async (req, res, next) => {
  try {
    const cartOrder = await Order.findCartOrder(req.user.id)
    res.send(cartOrder)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart - clear/delete existing cart
router.delete("/", requireToken, async (req, res, next) => {
  try {
    const cartOrder = await Order.findCartOrder(req.user.id)
    await cartOrder.destroy()
    res.send(cartOrder)
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/products/add - increment or add product in cart
router.put("/products/add", requireToken, async (req, res, next) => {
  try {
    const { id, price } = req.body
    const cart = await Order.findCartOrder(req.user.id)
    if (cart) {
      await cart.increment({ totalQty: 1, totalPrice: price })
      const product = await OrderedItem.findProductRow(cart.id, id)
      if (product) {
        await product.increment({ itemQty: 1, itemPrice: price })
        res.send(product)
      } else {
        const product = await cart.addProductToOrder(id, price)
        res.send(product)
      }
    } else {
      const newCart = await Order.createNewCart(price, req.user.id)
      await newCart.addProductToOrder(id, price)
      res.send(newCart.product)
    }
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/products/remove - decrement or remove product in cart
router.put("/products/remove", requireToken, async (req, res, next) => {
  try {
    const { id, price } = req.body
    const cart = await Order.findCartOrder(req.user.id)
    if (cart) {
      await cart.decrement({ totalQty: 1, totalPrice: price })
      const product = await OrderedItem.findProductRow(cart.id, id)
      if (product.itemQty > 1) {
        await product.decrement({ itemQty: 1, itemPrice: price })
      } else await product.destroy()
      res.send(product)
    }
  } catch (err) {
    next(err)
  }
})

// DELETE api/cart/products/:id - delete a product (row) in cart
router.delete("/products/:id", requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findCartOrder(req.user.id)
    if (cart) {
      const product = await OrderedItem.findProductRow(cart.id, req.params.id)
      await cart.decrement({
        totalQty: product.itemQty,
        totalPrice: product.itemPrice,
      })
      await product.destroy()
      res.send(product)
    }
  } catch (err) {
    next(err)
  }
})
