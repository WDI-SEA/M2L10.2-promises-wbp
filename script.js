// const mongoose = require('mongoose')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NewClient = require('./models/newClient.js');
const OldClient = require('./models/oldClient.js');
const clients = require('./dataCopy.js');

// const uri = "mongodb+srv://pkeen:<password>@cluster0.hvwwj6r.mongodb.net/?retryWrites=true&w=majority";
// require('dotenv').congfig();
dotenv.config();

const uri = process.env.DATABASE_URL;

mongoose.connect(uri);

const db = mongoose.connection;

db.on("connected", () => console.log("connected"));
db.on("error", () => console.log("error"));


const deleteData = async () => {
     // Remove all documents in the Client collection
    try {
        await NewClient.deleteMany({});
        await OldClient.deleteMany({});
    } catch (err) {
        console.log(err)
    }
}

const dbSeed = async () => {
   
    
    try {
        for (let client of clients) {
            // Convert the birthdate to a Date object
            let birthdate = new Date(client.birthdate);
            let registeredAt = new Date(client.registeredAt);
            
            // // Convert it back to a string
            // client.birthdate = birthdate.toISOString();
            // client.registeredAt = registeredAt.toISOString();

            // Now create the client
            const newClient = await NewClient.create(client);
            const oldClient = await OldClient.create(client);
            // console.log(newClient);
        }
        // console.log(await NewClient.find({}));
        // console.log(clients[0]);
        // console.log(newClient)
    } catch (err) {
        console.log(err)
    }
}

const filterCollections = async () => {
    try {
        await NewClient.deleteMany({
            stillClient: false
        });
        await OldClient.deleteMany({
            stillClient: true
        })
    } catch (err) {
        console.log(err);
    }
}

const main = async () => {
    try {
        await deleteData();
        await dbSeed();
        await filterCollections();
        await mongoose.connection.close();
    } catch (err) {
        console.log(err);
        mongoose.connection.close();
    }
}

// deleteData();

// dbSeed()
//     .then(() => mongoose.connection.close())
//     .catch((err) => {
//         console.error(err);
//         mongoose.connection.close();
//     });

main();





// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
