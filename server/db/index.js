//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Product = require('./models/product')
const Order = require('./models/order')
const Category = require('./models/category')

User.hasMany(Order)
Order.belongsTo(User, {as: 'Customer'})

Order.belongsToMany(Product, {though: 'itemsOrdered'})
Product.belongsToMany(Order, {though: 'itemsOrdered'})

Product.belongsToMany(Category, {though: 'productCategory'})
Category.belongsToMany(Product, {though: 'productCategory'})

module.exports = {
  db,
  models: {
    User, Product, Order, Category
  },
}
