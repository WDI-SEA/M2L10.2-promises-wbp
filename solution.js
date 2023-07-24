#!/usr/bin/env node
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
const customerSchema = mongoose.Schema({
    username: String, email: String, street: String, city: String, state: String,
    zip: String, employer: String, industry: String, avatar: String, password: String,
    birthdate: String, registeredAt: String, stillClient: Boolean,
})
const CurrentCustomer = mongoose.model('CurrentCustomer', customerSchema)
const FormerCustomer = mongoose.model('FormerCustomer', customerSchema)


let fakeData = require('./data')

db.on('connected', async ()=>{
    console.log(`connected to MongoDB ${db.name}`)
    await CurrentCustomer.deleteMany({})
    await FormerCustomer.deleteMany({})
    await CurrentCustomer.insertMany(fakeData.filter(e=>e.stillClient === true))
    await FormerCustomer.insertMany(fakeData.filter(e=>e.stillClient === false))

    process.exit()
})
