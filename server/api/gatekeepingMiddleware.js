const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next(); // so we can move on to the next piece of middleware
  } catch (e) {
    next(e);
  }
};

const isAdmin = (req, res, next) => {
  console.log("REQ USER", req.user);
  if (!req.user.isAdmin) {
    return res.status(403).send("You shall not pass!");
  } else {
    // if my users IS an admin, pass them forward!
    next();
  }
};

// const isUser = (req, res, next) => {
//   if (req.user) {
//     res.send(req.user);
//   } else {
//     // if my users IS an admin, pass them forward!
//     next();
//   }
// };

module.exports = {
  requireToken,
  isAdmin,
  //isUser,
};
