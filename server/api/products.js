const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

//GET all products
router.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll()
    res.send(data)
  } catch (err) {
    next(err);
  }
})

//GET single product
router.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});
