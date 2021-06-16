const router = require("express").Router();
const {
  models: { OrderedItem },
} = require("../db");
module.exports = router;

//change to /:userId/:orderId
router.get("/:orderId", async (req, res, next) => {
  try {
    const orderedItems = await OrderedItem.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.send(orderedItems);
  } catch (err) {
    next(err);
  }
});
