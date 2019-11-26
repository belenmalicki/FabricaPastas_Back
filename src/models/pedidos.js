var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pedidosSchema = new Schema({
    pedido: Array,
    cliente: String,
    sucursal: String,
    estado: String,
    
});

module.exports= mongoose.model('pedidos', pedidosSchema);