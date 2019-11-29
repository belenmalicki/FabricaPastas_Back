const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    mail: String,
    password: String,
    direccion:String,
    nombre:String,
    telefono:String,

});

module.exports= mongoose.model('users', userSchema);