const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
const { isAdmin, requireToken } = require("./gatekeepingMiddleware");

//GET all products
router.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//GET single product
router.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//POST single product
router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
});

//PUT single product
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const updatedProduct = await product.update(req.body);
    res.send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE single product
router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});
