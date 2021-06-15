//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const Category = require("./models/category");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: "itemsOrdered" });
Product.belongsToMany(Order, { through: "itemsOrdered" });

Product.belongsToMany(Category, { through: "productCategory" });
Category.belongsToMany(Product, { through: "productCategory" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Category,
  },
};
