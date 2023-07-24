const mongoose = require("mongoose");
const client = require("./data");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");


dotenv.config();
const database = process.env.DATABASE_URL;

mongoose
  .connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Clint database Connected"))
  .catch((err) => console.log(err));

const clientList = async () => {
  let clients = [];

  for (let i = 0; i < 100; i++) {
    const clientSeeder = new client({

        username: faker.internet.userName(),
		email: faker.internet.email(),
		street: faker.address.streetAddress(),
		city: faker.address.city(),
		state: faker.address.state(),
		zip: faker.address.zipCode(),
		employer: faker.company.name(),
		industry: faker.commerce.department(),
		avatar: faker.image.avatar(),
		password: faker.internet.password(),
		birthdate: faker.date.birthdate(),
		registeredAt: faker.date.past(),
		stillClient: faker.datatype.boolean()
    });

    if (clients.stillClient = true)
    {oldClients.push(clientSeeder)}
    else{clients.push(clientSeeder);}


  }

  const seedClients = async () => {
    await client.deleteMany({});
    await client.insertMany(clients);
  };

  seedClients().then(() => {
    console.log("Clients Seeded Successfully!");
    mongoose.connection.close();
  });
};

seedUserList();


module.exports = {
  seedUserList,
};