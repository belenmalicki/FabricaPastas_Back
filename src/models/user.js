    
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
/* voy a usar el bcript para encriptar el password del usuario enctonces hago un metodo que se llama
encryptPassword(o como quiera que se llame) y en la arrow le paso el password y adentro ejecuto la funcion bycript
le paso el opassword y con el genSalt le digo que se ejecute cada 10 saltos(wtf)*/
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  
/*como en la bd me va a guardar el password encriptado, con este metodo, cuando el usuario inicie sesion, voy a comparar lo que me 
pone con lo que tengo en la bd*/
userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}


module.exports= mongoose.model('users', userSchema);