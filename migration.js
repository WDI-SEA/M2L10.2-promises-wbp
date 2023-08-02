const data = require("./data")
const oldClient = require("./models/oldClient")
const newClient = require("./models/newClient")
require("./config/database")

//iterate each client in the dataset 
//decide whic model to use

// data.forEach(client => {
//     if (client.stillCLient) {
//         newClient.create(client)
//         console.log(`${client.username} is still a client}`)
//     } else {
//         console.log(`${client.username} is not a client`)
//     }
// })

data.forEach(async client => {
    await newClient.create(client)
    await oldClient.create(client)
})

//find all old clients
const clientRemoval = async () => {
    try{
       await oldClient.deleteMany({ stillClient: true})
       await newClient.deleteMany({stillClient: false})

    } catch (err) {

    }
}

//iterate old clients and delete them if stillclient = true
//do reverse for new clients