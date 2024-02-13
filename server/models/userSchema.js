const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confpassword: {
        type: String
    },
    mobile: {
        type: Number
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    },
    myFile: {
        type: String
    },
    Address: [
        {
            Address_id: { type: Number },
            address: { type: String },
            pincode: { type: Number },
            city: { type: String },
            state: { type: String },
            country: { type: String }
        }
    ],
})

module.exports = mongoose.model('Users', userSchema)