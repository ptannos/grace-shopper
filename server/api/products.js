const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

//GET single product
router.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});
