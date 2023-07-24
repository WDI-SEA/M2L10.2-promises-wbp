const mongoose = require('mongoose');

const newClientSchema = mongoose.Schema({
    username: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    employer: String,
    industry: String,
    avatar: String,
    password: String,
    birthdate: Date,
    registeredAt: Date,
    stillClient: Boolean
});

// const NewClient = mongoose.model('NewClient', newClientSchema)

// export default NewClient;

module.exports = mongoose.model('NewClient', newClientSchema);