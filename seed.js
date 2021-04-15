const faker = require('faker');
const hash = require('./server/hash');

const { db, Category, Plant, Order, User, Session } = require('./server/db');

const categories = [
  { title: 'Fern' },
  { title: 'Nightshade' },
  { title: 'Cactus' },
  { title: 'Flower' },
  { title: 'Tree' },
];

const discounts = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7];

const plants = [
  {
    plantName: "Aglaonema 'Golden Madonna' 14",
    price: 133.95,
    description: 'Large bright gold and green variegated foliage.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/628fea790b836d98dd30ab0533f7c647_5000x.jpg?v=1607818727',
  },
  {
    plantName: 'Aglaonema 10in Silver Bay',
    price: 19.95,
    description:
      'Rich green leaves with silver patterns on a medium-sized bushy plant. Grows a spathe-type inflorescence.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/d2e942f00b2ba58b1b1d1491c944d387_5000x.jpg?v=1596841548',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: "Asplenium nidus 2in Crispy Wave Bird's Nest Fern",
    price: 20.5,
    description:
      'Lush, tropical fern that grows wavy sword-shaped fronds from a central rosette.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/c8a0e8a309cb4ec578322452adbe1f41_5000x.jpg?v=1614019345',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: "Pachira aquatica 'Money Tree Stump' 14",
    price: 19.95,
    description:
      'Thick central trunk topped with large, five-lobed, glossy green leaves.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/a48beb3560b28a437bbcd947001d5c60_5000x.jpg?v=1606064710',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: 'Chlorophytum comosum 4in Curly Spider Plant',
    price: 44.95,
    description: 'Curly, long, white and green variegated foliage.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/9fe12c7d88c1ffcf137235f29e7c5b10_5000x.jpg?v=1602377251',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: 'Calathea lancifolia 4in Rattlesnake Plant',
    price: 11.95,
    description:
      ' Uniquely patterned foliage with deep purple undersides to long, slender leaves with a slight frill. Rarely flowers indoors, but when it does it has white flowers that appear at the base of the plant.',

    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/eca0c1ae1ebcc1fc4b432c28069fe0f3_5000x.jpg?v=1596842022',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: 'Sansevieria trifasciata 8in Laurentii',
    price: 55.95,
    description:
      ' Long, narrow, thick leaves with yellow margins and mottled green centers that protrude directly from the ground. Flowers rarely, white or cream flowers grow on a long flower stalk.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/ac9ee1764abfd5d2d14bdaa926ae2e6f_5000x.jpg?v=1596841571',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: 'Zebra Cactus (Haworthia Zebrina) 4in',
    price: 29.95,
    description:
      'Stiff, pointed dark green leaves with white stripes grow in a rosette. Flowers are white-pink, tubular, and grow on long stalks.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/977092340befeca140b83a2a044553f1_5000x.jpg?v=1596913494',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: 'Pilea peperomioides 4in Chinese Money Plant',
    price: 190.95,
    description:
      'Bright green circular leaves that emanate from a central stem. Grows pups under its leaves. Rarely flowers, but can grow white spikes with groups of small blooms.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/825dc03589bfb8563bd0edab31a2fbe6_5000x.jpg?v=1596841606',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: "Euphorbia ingens 'Candelabra Tree' 14",
    price: 190.95,
    description:
      'Succulent plant that features cactus-like, segmented arms growing from a single trunk.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/975a571e8969468a64fe2e1bd574cd80_5000x.jpg?v=1606064286',
    countryOfOrigin: faker.address.state(),
  },
  {
    plantName: 'Ficus microcarpa 14in Moclame Standard',
    price: 190.95,
    description: 'Thick, rounded green leaves form a tree-shaped houseplant.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/3f960a0c0b8ea634fba355312ca99e43_5000x.jpg?v=1607817291',
    countryOfOrigin: faker.address.state(),
  },
];

const users = [
  {
    userType: 'admin',
    firstName: 'Cynthia',
    lastName: 'Ellison',
    userEmail: 'Cynthia8499@hotmail.com',
    username: 'CynthiaEllison',
    password: '',
  },
  {
    userType: 'admin',
    firstName: 'Fu',
    lastName: 'Goto',
    userEmail: 'fu.goto@gmail.com',
    username: 'FuGoto',
    password: '',
  },
  {
    userType: 'admin',
    firstName: 'Mark',
    lastName: 'Guinn',
    userEmail: 'mxavier927@gmail.com',
    username: 'MarkGuinn',
    password: '',
  },
  {
    userType: 'admin',
    firstName: 'Doug',
    lastName: 'Miller',
    userEmail: 'djmiller1717@gmail.com',
    username: 'DougMiller',
    password: '',
  },
];
while (users.length < 20) {
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userEmail: faker.internet.email(),
    username: faker.internet.userName(),
    password: '',
  });
}

const orders = [];
while (orders.length < 10) {
  if (orders.length % 2 === 0) {
    orders.push({
      shippingAddress: faker.address.streetAddress(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
    });
  } else {
    orders.push({
      isPaid: true,
      shippingAddress: faker.address.streetAddress(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
    });
  }
}

const sessions = [];
while (sessions.length < 20) {
  sessions.push({
    uuid: faker.random.uuid(),
  });
}

async function hashPasswords() {
  for (let i = 0; i < users.length; i++) {
    const { username } = users[i];
    users[i].password = await hash(username);
  }
}

const seed = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('seeding');
    await db.sync({ force: true });
    await hashPasswords();
    await Promise.all([
      Category.bulkCreate(categories),
      User.bulkCreate(users),
      Order.bulkCreate(orders),
      Session.bulkCreate(sessions),
      Plant.bulkCreate(plants),
    ]);
    const [
      usersCreated,
      plantsCreated,
      ordersCreated,
      sessionsCreated,
    ] = await Promise.all([
      User.findAll(),
      Plant.findAll(),
      Order.findAll(),
      Session.findAll(),
    ]);

    for (let i = 0; i < usersCreated.length - 1; i++) {
      await sessionsCreated[i].setUser(usersCreated[i]);
    }
    // assign a session to each order - while a user can have multiple orders, for seeding purposes only assigning one order per user, since default setting is not paid (i.e. it's a cart and each user only has one open cart)
    for (let i = 0; i < ordersCreated.length; i++) {
      await ordersCreated[i].setSession(sessionsCreated[i]);
    }
    // assign plants to each order
    for (let i = 0; i < ordersCreated.length; i++) {
      let rand = Math.floor(Math.random() * (plantsCreated.length - 1));
      await ordersCreated[i].setPlants([
        plantsCreated[rand],
        plantsCreated[rand + 1],
      ]);
    }
    for (let i = 0; i < ordersCreated.length; i++) {
      const order = ordersCreated[i];
      await order.calcTotal();
    }

    await db.close();
    console.log('seeded');
  } catch (err) {
    console.error(err);
  }
};

seed();
