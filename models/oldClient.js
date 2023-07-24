const mongoose = require('mongoose');

const oldClientSchema = mongoose.Schema({
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

const OldClient = mongoose.model('OldClient', oldClientSchema);

// export default OldClient;

module.exports = OldClient;