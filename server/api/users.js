const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//GET all users
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "firstName", "lastName", "username", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET single user
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.id)) {
      const data = await User.findByPk(req.params.id);
      res.send(data);
    }
  } catch (err) {
    next(err);
  }
});

//PUT single user
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    const updatedUser = await user.update(req.body);
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
});
