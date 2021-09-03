# GS Plate Hopper

## Deployed on Heroku: http://plate-hopper.herokuapp.com/

Plate Hopper is a meal-kit delivery service inspired by cuisines from around the world. This e-commerce site was built by Torie Kim, Marcia Rodriguez, Pauline Tannos, and Anna Vaigast during their studies at The Grace Hopper Program at Fullstack Academy. 

## Tech stack
- React
- Redux
- Express
- Sequelize (PostgreSQL)

## Site Features

- Login, logout, & sign up
- Browse products & view single products
- Add products to cart (as a registered user or as a guest)
- View & edit cart
- Checkout & purchase confirmation

## Setup

- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
- These commands will create both your **development** and **test** databases

```
createdb gs-plate-hopper
createdb gs-plate-hopper-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
