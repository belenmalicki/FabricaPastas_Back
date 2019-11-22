var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pedidosSchema = new Schema({
    pedido: Array,
    
});

module.exports= mongoose.model('pedidos', pedidosSchema);