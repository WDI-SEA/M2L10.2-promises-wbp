require('dotenv').config()
require('./config/database')
const colors = require('colors')

const NewClient = require('./models/NewClient')
const OldClient = require('./models/OldClient')

const data = require('./data')

const seed = (async function () {
    const asyncDeleteNewClients = NewClient.deleteMany({});
    const asyncDeleteOldClients = OldClient.deleteMany({});

    let results = await Promise.all([asyncDeleteNewClients,asyncDeleteOldClients])
    console.log('Deleted All Clients'.red.inverse)
    console.log(results)

    results = await Promise.all([
        NewClient.create(data.clients),
        OldClient.create(data.clients)
    ])
    console.log(`Inserted All Clients`.green.inverse)

    process.exit()
});

seed();