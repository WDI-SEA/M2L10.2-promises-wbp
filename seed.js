require('dotenv').config()
require('./config/database')
const colors = require('colors')

const NewClient = require('./models/NewClient')
const OldClient = require('./models/OldClient')

const data = require('./data')

const resetDBAsync = async function () {
    console.log(`New Clients: ${await NewClient.countDocuments()}`.blue.inverse)
    console.log(`Old Clients: ${await OldClient.countDocuments()}`.blue.inverse)
    
    const asyncDeleteNewClients = NewClient.deleteMany({});
    const asyncDeleteOldClients = OldClient.deleteMany({});

    let results = await Promise.all([asyncDeleteNewClients,asyncDeleteOldClients])
    console.log('Deleted All Clients Async'.red.inverse)
}

const seedAsync = (async function () {
    await resetDBAsync()
    let start = Date.now();

    let results = await Promise.all([
        NewClient.create(data.clients),
        OldClient.create(data.clients)
    ])
    
    let end = Date.now();

    console.log(`New Clients: ${results[0].length}`.blue.inverse)
    console.log(`Old Clients: ${results[1].length}`.blue.inverse)
    console.log(`Inserted All Clients - Async --- Execution time: ${end - start} ms`.green.inverse)

    // Delete old/new and remove from new/old
    start = Date.now();

    results = await Promise.all([
        NewClient.deleteMany({ stillClient: false }),
        OldClient.deleteMany({ stillClient: true })
    ])
    end = Date.now();
    
    console.log(`New Clients: ${await NewClient.countDocuments()}`.blue.inverse)
    console.log(`Old Clients: ${await OldClient.countDocuments()}`.blue.inverse)
    console.log(`Removed Old from New and New from Old - Async --- Execution time: ${end - start} ms`.blue.inverse)
    
    process.exit()
});

const resetDBSeq = async function () {
    console.log(`New Clients: ${await NewClient.countDocuments()}`.blue.inverse)
    console.log(`Old Clients: ${await OldClient.countDocuments()}`.blue.inverse)
    
    await NewClient.deleteMany({})
    await OldClient.deleteMany({})
    console.log('Deleted All Clients Seq'.red.inverse)
}

const seedSeq = async function () {
    await resetDBSeq()
    let start = Date.now();

    await NewClient.create(data.clients)
    await OldClient.create(data.clients)
    
    let end = Date.now();
    
    console.log(`New Clients: ${await NewClient.countDocuments()}`.blue.inverse)
    console.log(`Old Clients: ${await OldClient.countDocuments()}`.blue.inverse)
    console.log(`Inserted All Clients - Seq --- Execution time: ${end - start} ms`.green.inverse)
    
    // Delete old/new and remove from new/old
    start = Date.now();
    
    await NewClient.deleteMany({ stillClient: false })
    await OldClient.deleteMany({ stillClient: true })

    end = Date.now();
    
    console.log(`New Clients: ${await NewClient.countDocuments()}`.blue.inverse)
    console.log(`Old Clients: ${await OldClient.countDocuments()}`.blue.inverse)
    console.log(`Removed Old from New and New from Old - Seq --- Execution time: ${end - start} ms`.blue.inverse)
    
    process.exit()
}

if (process.argv[2] === '-a') seedAsync();
else seedSeq();