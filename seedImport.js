require('dotenv').config()
require('./config/database')
const colors = require('colors')

const NewClient = require('./models/NewClient')
const OldClient = require('./models/OldClient')

const data = require('./data')

(async function () {
    const asyncDeleteNewClients = NewClient.deleteMany({});
    const asyncDeleteOldClients = OldClient.deleteMany({});

    let results = await Promise.all([p1,p2])
    console.log(`Deleted All Clients`.red.inverse)
    console.log(results)

    data.forEach(client => {
        client.birthdate = JSON.stringify(client.birthdate)
        client.registeredAt = JSON.stringify(client.registeredAt)
    });

    results = await Promise.all([
        NewClient.create(data),
        OldClient.create(data)
    ])
    console.log(`Inserted All Clients`.green.inverse)
    console.log(results)

    process.exit()
})();