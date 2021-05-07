const mongoose = require('mongoose');


const User=new mongoose.Schema({
    Email:String,
    Password:String,
    Date: {
        type:Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', User);