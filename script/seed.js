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

  const [grace, cody, murphy, gordon, guy, rachel, sunny] = await Promise.all([
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

  const [order1, order2, order3, order4, order5] = await Promise.all([
    Order.create({
      //first three items on products
      totalPrice: 80,
      totalQty: 3,
      shippingAddress: "2161 Kinney St, Holyoke, MA 01040",
      status: "cart",
    }),
    Order.create({
      // items 4 and 5
      totalPrice: 55,
      totalQty: 2,
      shippingAddress: "2196 Clarence Court, Rancho Cucamonga, CA 91730",
      status: "cancelled",
    }),
    Order.create({
      // item 6
      totalPrice: 20,
      totalQty: 1,
      shippingAddress: "4241 Pick Street, Aurora, CO 80011",
      status: "purchased",
    }),
    Order.create({
      // items 1 and 3
      totalPrice: 60,
      totalQty: 2,
      shippingAddress: "3000 Oak Street, Old Forge, NY 13420",
      status: "shipped",
    }),
    Order.create({
      // items 1 through 5
      totalPrice: 135,
      totalQty: 5,
      shippingAddress: "2335 Patterson Rd Apt 3, Brooklyn, NY 11204",
      status: "delivered",
    }),
  ]);

  const [
    paella,
    som,
    poutine,
    tacos,
    crab,
    roll,
    lasagna,
    poke,
    croissant,
    chow,
    tarts,
    pierogi,
    pizza,
    curry,
    sushi,
  ] = await Promise.all([
    Product.create({
      name: "Seafood Paella",
      description: `The sea is lapping just by your feet, a warm breeze whips the tablecloth around your legs and a steamy pan of paella sits in front of you. Shrimp, lobster, mussels and cuttlefish combine with white rice and various herbs, oil and salt in this Valencian dish to send you immediately into holiday mode. Though if you have it in Spain, you're probably there already.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170206165040-dubai-michelin-dining-boca.jpg",
      prepTime: 3,
      quantity: 50,
      price: 40.0,
      country: "Spain",
    }),
    Product.create({
      name: "Som Tam",
      description: `To prepare Thailand's most famous salad, pound garlic and chilies with a mortar and pestle. Toss in tamarind juice, fish sauce, peanuts, dried shrimp, tomatoes, lime juice, sugar cane paste, string beans and a handful of grated green papaya. Grab a side of sticky rice. Variations include those made with crab (som tam boo) and fermented fish sauce (som tam plah lah), but none matches the flavor and simple beauty of the original.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170302150230-som-tam.jpg",
      prepTime: 1,
      quantity: 30,
      price: 20.0,
      country: "Thailand",
    }),
    Product.create({
      name: "Poutine",
      description: `French fries smothered in cheese curds and brown gravy. Sounds kind of disgusting, looks even worse, but engulfs the mouth in a saucy, cheesy, fried-potato mix that'll have you fighting over the last dollop. Our Canadian friends insist it's best enjoyed at 3 a.m. after "several" beers.`,
      imageURL:
        "https://www.thespruceeats.com/thmb/COogYnopXIL-vzFTNbRY_uLYb-w=/2000x1125/smart/filters:no_upscale()/Poutine-GettyImages-154959976-58edaa473df78cd3fc78d1fb.jpg",
      prepTime: 1.5,
      quantity: 45,
      price: 20.0,
      country: "Canada",
    }),
    Product.create({
      name: "Carne Asada Tacos",
      description: `A fresh, handmade tortilla stuffed with small chunks of grilled beef rubbed in oil and sea salt then covered with guacamole, salsa, onions, cilantro or anything else you want -- perfect for breakfast, lunch or dinner. This is the reason no visitor leaves Mexico weighing less than when they arrived.`,
      imageURL:
        "https://www.mexicanplease.com/wp-content/uploads/2019/07/Carne-Asada-Tacos-9.jpg",
      prepTime: 2,
      quantity: 35,
      price: 25.0,
      country: "Mexico",
    }),
    Product.create({
      name: "Chili Crab",
      description: `You can't visit Singapore without trying its spicy, sloppy, meaty specialty. While there are dozens of ways to prepare crab (with black pepper, salted egg yolk, cheese-baked, et cetera) chili crab remains the local bestseller. Spicy chili-tomato gravy tends to splatter, which is why you need to mop everything up with mini mantou buns.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170306145913-singapore-chili-crab.jpg",
      prepTime: 2.5,
      quantity: 25,
      price: 30.0,
      country: "Singapore",
    }),
    Product.create({
      name: "Goi Cuon (Summer Roll)",
      description: `This snack made from pork, shrimp, herbs, rice vermicelli and other ingredients wrapped in rice paper is served at room temperature. It's "meat light," with the flavors of refreshing herbs erupting in your mouth. Dipped in a slightly sweet Vietnamese sauce laced with ground peanuts, it's wholesome, easy and the very definition of "moreish."`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170306134418-goi-cuon.jpg",
      prepTime: 0.5,
      quantity: 50,
      price: 20.0,
      country: "Vietnam",
    }),
    Product.create({
      name: "Vegetable Lasagna",
      description: `Second only to pizza in the list of famed Italian foods, there's a reason this pasta-layered, tomato-sauce-infused, minced-veggies gift to kids and adults alike is so popular -- it just works.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F140430115517-06-comfort-foods.jpg",
      prepTime: 1.5,
      quantity: 45,
      price: 20.0,
      country: "Italy",
    }),
    Product.create({
      name: "Tuna Poke",
      description: `This iconic Hawaiian appetizer is a raw fish salad -- it originated when local fishermen were looking for use for the cut-offs from their catches. The fish is seasoned in different ways -- so it's a delicious but also healthy dish. The meal has now spread to the mainland -- and across the globe.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170802120037-poke.jpg",
      prepTime: 1,
      quantity: 38,
      price: 30.0,
      country: "United States",
    }),
    Product.create({
      name: "Croissant",
      description: `Flaky pastry smothered in butter, a pile of raspberry jam smeared over the top and a soft, giving bite as you sink in your teeth; there's nothing not to love about this fatty, sweet breakfast food that must be married to a cup of strong coffee.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170927121453-croissants.jpg",
      prepTime: 2,
      quantity: 47,
      price: 18.0,
      country: "France",
    }),
    Product.create({
      name: "Bunny Chow",
      description: `Despite the name, no rabbits are harmed in the making of one of South Africa's best-loved street foods. Bunny chow is hollowed-out half- or quarter-loaves of white bread filled with super-spicy curry. The dish originated in Durban's Indian community.`,
      imageURL:
        "https://img.onmanorama.com/content/dam/mm/en/food/foodie/images/2020/2/17/bunny-chow.jpg",
      prepTime: 1.5,
      quantity: 30,
      price: 25.0,
      country: "South Africa",
    }),
    Product.create({
      name: "Pastel de nata (Custard Tarts)",
      description: `Pastel de natas are perhaps the world's tastiest laundry byproduct. Legend has it that Portuguese nuns and monks, having used egg whites to starch their religious clothing, used the leftover yolks to make pastries, including these sinfully delicious custard tarts.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F160713174314-lisbon-pastelarias.jpg",
      prepTime: 2,
      quantity: 50,
      price: 20.0,
      country: "Portugal",
    }),
    Product.create({
      name: "Cheese Pierogi",
      description: `There are dumplings, and then there are Polish dumplings. Pierogi are parcels of deliciousness that can be filled with everything from potato to sauerkraut to meat to cheese and to fruit, and often topped with melted butter, sour cream or fried onions. They're traditionally boiled, although fried pierogi are becoming more common.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F161209170008-poland-pierogi.jpg",
      prepTime: 2,
      quantity: 25,
      price: 25.0,
      country: "Poland",
    }),
    Product.create({
      name: "Neapolitan Pizza",
      description: `Spare us the lumpy chain monstrosities and "everything-on-it" wheels of greed. The best pizza was and still is the simple Neapolitan, an invention now protected by its own trade association that insists on sea salt, high-grade wheat flour, the use of only three types of fresh tomatoes, hand-rolled dough and the strict use of a wood-fired oven, among other quality stipulations. With just a few ingredients -- dough, tomatoes, olive oil, salt and basil (the marinara pizza does not even contain cheese) -- the Neapolitans created a food that few make properly, but everyone enjoys thoroughly.`,
      imageURL:
        "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2020/08/coppa-Tastemade_Pizza.jpg",
      prepTime: 1.5,
      quantity: 36,
      price: 25.0,
      country: "Italy",
    }),
    Product.create({
      name: "Massaman Curry",
      description: `Emphatically the king of curries, and perhaps the king of all foods. Spicy, coconutty, sweet and savory. Even the packet sauce you buy from the supermarket can make the most delinquent of cooks look like a Michelin potential. Thankfully, someone invented rice, with which diners can mop up the last drizzles of curry sauce. "The Land of Smiles" isn't just a marketing catch-line. It's a result of being born in a land where the world's most delicious food is sold on nearly every street corner.`,
      imageURL:
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_602,c_fill,g_auto,h_339,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170228162042-massaman-curry.jpg",
      prepTime: 1.5,
      quantity: 42,
      price: 25.0,
      country: "Thailand",
    }),
    Product.create({
      name: "Assorted Nigiri Sushi",
      description: `When Japan wants to build something right, it builds it really right. Brand giants such as Toyota, Nintendo, Sony, Nikon and Yamaha may have been created by people fueled by nothing more complicated than raw fish and rice, but it's how the fish and rice is put together that makes this a global first-date favorite. The Japanese don't live practically forever for no reason -- they want to keep eating this stuff.`,
      imageURL:
        "https://www.thespruceeats.com/thmb/u3eJa4SSpZ5NfCKdTtu_rj-Sc9w=/1923x1559/filters:fill(auto,1)/nigirisushi-1d865aa75e01437ab95916c025242ca3.jpg",
      prepTime: 2,
      quantity: 29,
      price: 50.0,
      country: "Japan",
    }),
  ]);

  const categories = await Promise.all([
    Category.create({
      name: "Vegetarian",
    }),
    Category.create({
      name: "Gluten-free",
    }),
    Category.create({
      name: "Pastries",
    }),
    Category.create({
      name: "Dinner",
    }),
    Category.create({
      name: "Seafood",
    }),
    Category.create({
      name: "Pasta",
    }),
    Category.create({
      name: "Beef",
    }),
    Category.create({
      name: "Chicken",
    }),
    Category.create({
      name: "Spicy",
    }),
    Category.create({
      name: "Healthy",
    }),
    Category.create({
      name: "Easy",
    }),
    Category.create({
      name: "Lunch",
    }),
    Category.create({
      name: "Breakfast",
    }),
    Category.create({
      name: "Dairy-free",
    }),
    Category.create({
      name: "Low-carb",
    }),
    Category.create({
      name: "Pork",
    }),
  ]);

  await order1.setUser(grace);
  await order2.setUser(cody);
  await order3.setUser(cody);
  await order4.setUser(gordon);
  await order5.setUser(guy);

  await order1.setProducts([paella, som, tacos]);
  await order2.setProducts([poutine, crab]);
  await order3.setProducts(roll);
  await order4.setProducts([paella, tacos]);
  await order5.setProducts([paella, som, tacos, poutine, crab, roll]);

  await paella.setCategories([categories[3], categories[4]]);
  await som.setCategories([
    categories[1],
    categories[9],
    categories[10],
    categories[13],
  ]);
  await poutine.setCategories([categories[1], categories[10]]);
  await tacos.setCategories([categories[1], categories[6], categories[13]]);
  await crab.setCategories([categories[4], categories[8]]);
  await roll.setCategories([
    categories[1],
    categories[9],
    categories[10],
    categories[13],
  ]);
  await lasagna.setCategories([categories[0], categories[3], categories[5]]);
  await poke.setCategories(
    categories[4],
    categories[9],
    categories[10],
    categories[11]
  );
  await croissant.setCategories(categories[2]);
  await chow.setCategories([categories[0], categories[8]]);
  await tarts.setCategories(categories[2]);
  await pierogi.setCategories([categories[0], categories[10]]);
  await pizza.setCategories([categories[0], categories[10]]);
  await curry.setCategories([categories[1], categories[3], categories[8]]);
  await sushi.setCategories(categories[4]);

  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: [grace, cody, murphy, gordon, guy, rachel, sunny],
    categories,
    orders: [order1, order2, order3, order4, order5],
    products: [
      paella,
      som,
      tacos,
      poutine,
      crab,
      roll,
      lasagna,
      poke,
      croissant,
      chow,
      tarts,
      pierogi,
      pizza,
      curry,
      sushi,
    ],
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
