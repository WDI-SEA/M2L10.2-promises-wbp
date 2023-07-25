const data = require('./data')
const oldClient = require('./models/oldClient')
const newClient = require('./models/newClient')
require('./config/database')


// data.forEach(client => {
//     if (client.stillClient) {
//         console.log(`${client.username} is still a client!`)
//     } else {
//         console.log(`${client.username} is no longer a client!`)
//     }
// })

// data.forEach(async client => {
//     await newClient.create(client)
//     await oldClient.create(client)
// })

const clientRemoval = async () => {
    try {
        await oldClient.deleteMany({ stillClient: true})

        await newClient.deleteMany({ stillClient: false})
    } catch (err) {

    }
}

clientRemoval()