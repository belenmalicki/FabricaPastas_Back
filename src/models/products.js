var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productsSchema = new Schema({
    nombre:String,
    tipo: Array,
    precio: Number, 
    descripcion:String,
    unidad: Boolean,
    img: String
    
});

module.exports= mongoose.model('products', productsSchema);