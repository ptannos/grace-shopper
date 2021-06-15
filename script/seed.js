"use strict";

const {
  db,
  models: { User, Order, Product, Category },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "GraceChopper",
      password: "chopchop",
      email: "grace@example.com",
      isAdmin: true,
    }),
    User.create({
      username: "cody",
      password: "123",
      email: "cody@example.com",
      isAdmin: false,
    }),
    User.create({
      username: "murphy",
      password: "456",
      email: "murphy@chopper.com",
      isAdmin: false,
    }),
    User.create({
      username: "GordonRamsey",
      password: "itsraw",
      email: "gordon@chopper.com",
      isAdmin: false,
    }),
    User.create({
      username: "GuyFieri",
      password: "flavortown",
      email: "guy@chopper.com",
      isAdmin: false,
    }),
    User.create({
      username: "RachelRay",
      password: "evoo",
      email: "rachel@chopper.com",
      isAdmin: false,
    }),
    User.create({
      username: "Sunny",
      password: "sunsun",
      email: "sunny@chopper.com",
      isAdmin: false,
    }),
  ]);

  const orders = await Promise.all([
    Order.create({
      totalPrice: 100.5,
      shippingAddress: "123 Main",
      status: "purchased",
      totalQty: 2,
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Seafood Paella - Spain",
      description: `The sea is lapping just by your feet, a warm breeze whips the tablecloth around your legs and a steamy pan of paella sits in front of you. Shrimp, lobster, mussels and cuttlefish combine with white rice and various herbs, oil and salt in this Valencian dish to send you immediately into holiday mode. Though if you have it in Spain, you're probably there already.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170206165040-dubai-michelin-dining-boca.jpg",
      prepTime: 3,
      quantity: 50,
      price: 40.0,
    }),
    Product.create({
      name: "Som Tam - Thailand",
      description: `To prepare Thailand's most famous salad, pound garlic and chilies with a mortar and pestle. Toss in tamarind juice, fish sauce, peanuts, dried shrimp, tomatoes, lime juice, sugar cane paste, string beans and a handful of grated green papaya. Grab a side of sticky rice. Variations include those made with crab (som tam boo) and fermented fish sauce (som tam plah lah), but none matches the flavor and simple beauty of the original.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170302150230-som-tam.jpg",
      prepTime: 1,
      quantity: 30,
      price: 20.0,
    }),
    Product.create({
      name: "Poutine - Canada",
      description: `French fries smothered in cheese curds and brown gravy. Sounds kind of disgusting, looks even worse, but engulfs the mouth in a saucy, cheesy, fried-potato mix that'll have you fighting over the last dollop. Our Canadian friends insist it's best enjoyed at 3 a.m. after "several" beers.`,
      imageURL:
        "https://www.thespruceeats.com/thmb/COogYnopXIL-vzFTNbRY_uLYb-w=/2000x1125/smart/filters:no_upscale()/Poutine-GettyImages-154959976-58edaa473df78cd3fc78d1fb.jpg",
      prepTime: 1.5,
      quantity: 45,
      price: 20.0,
    }),
    Product.create({
      name: "Carne Asada Tacos",
      description: `A fresh, handmade tortilla stuffed with small chunks of grilled beef rubbed in oil and sea salt then covered with guacamole, salsa, onions, cilantro or anything else you want -- perfect for breakfast, lunch or dinner. This is the reason no visitor leaves Mexico weighing less than when they arrived.`,
      imageURL:
        "https://www.mexicanplease.com/wp-content/uploads/2019/07/Carne-Asada-Tacos-9.jpg",
      prepTime: 2,
      quantity: 35,
      price: 25.0,
    }),
    Product.create({
      name: "Chili Crab - Singapore",
      description: `You can't visit Singapore without trying its spicy, sloppy, meaty specialty. While there are dozens of ways to prepare crab (with black pepper, salted egg yolk, cheese-baked, et cetera) chili crab remains the local bestseller. Spicy chili-tomato gravy tends to splatter, which is why you need to mop everything up with mini mantou buns.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170306145913-singapore-chili-crab.jpg",
      prepTime: 2.5,
      quantity: 25,
      price: 30.0,
    }),
    Product.create({
      name: "Goi Cuon (Summer Roll)",
      description: `This snack made from pork, shrimp, herbs, rice vermicelli and other ingredients wrapped in rice paper is served at room temperature. It's "meat light," with the flavors of refreshing herbs erupting in your mouth. Dipped in a slightly sweet Vietnamese sauce laced with ground peanuts, it's wholesome, easy and the very definition of "moreish."`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170306134418-goi-cuon.jpg",
      prepTime: 0.5,
      quantity: 50,
      price: 20.0,
    }),
    // Product.create({
    //   name: '',
    //   country: '',
    //   description: ``,
    //   imageURL: '',
    //   prepTime: ,
    //   quantity: ,
    //   price: ,
    // }),
  ]);

  // Product.create({
  //   name: '',
  //   description: ``,
  //   imageURL: '',
  //   prepTime: ,
  //   quantity: ,
  //   price: ,
  // }),

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
