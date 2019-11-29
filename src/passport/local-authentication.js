const passport =require('passport');
const User =require('../models/user');
const Prod = require('../models/products');
const Pedido = require('../models/pedidos');



let insertContacto = (req,res, password,mail) =>
{

    var newContacto = User({
        mail: req.body.mail,
        password: req.body.password,
        direccion: req.body.direccion,
        nombre: req.body.nombre,
        telefono: req.body.telefono
    });
 
    
        //console.log("ingresado");
        let filtro = {mail:req.body.mail};
        User.find(filtro,function(err,usuario)
        {
            //si no existe el mail lo creo
            if (usuario.length==0)
            {
                newContacto.save().
                then
                (
                    (newContacto)=>
                    {
                        res.status(200).send(newContacto); //devuelvo resultado query       
                    },
                    (err)=>
                    { 
                        res.status(500).send(err);
                    
                        //console.log(err);
                    }
                ) 
            }
            else
            {
                //console.log("usu",usuario);
                res.status(501).send({estado:"El mail informado ya existe"}); //devuelvo resultado query   
                //console.log(listaContactos);    
            }
        })


};

let buscarContacto =(req, res) =>{
    let mailBusqueda = {mail:req.body.mail};
    let passBusqueda= req.body.password;
    User.find(mailBusqueda,function(err,usuario)
    { 
        if (usuario.length!=0)
        {

           for (var i = 0; i < usuario.length; i++){
            //console.log(usuario[i].password );
            
            if (usuario[i].password == passBusqueda){
              res.status(200).send(usuario);
            }
            if (usuario[i].password != passBusqueda){
            res.status(501).send({estado:"Los datos ingresados son incorrectos"});
            }
          }
             
        }
        else
        {  
            res.status(501).send({estado:"Los datos ingresados son incorrectos"}); //devuelvo resultado query   
        }
    });
}
    let getProductos =(req, res) =>
    {
    Prod.find(function(err,listProd)
        {
            res.status(200).send(listProd);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
        }
    );
};

let getContacto =(req, res, ) =>
{
let idBusqueda = {mail: req.body.mail};
User.find(idBusqueda,function(err,usuario)
    {
    res.status(200).send(usuario);
        (listaContactos)=>
        { 
            res.status(200).send(listaContactos); //devuelvo resultado query   
            //console.log(listaContactos);    
        },
        (err)=>
        {
            res.status(500).send(err);
            console.log('mi error es:')
            console.log(err);
        }
    });
};

let getPedido =(req, res, ) =>
{console.log('getPedido leido');
let idBusqueda = {cliente: req.body.mail};
console.log(idBusqueda);
Pedido.find(idBusqueda,function(err,pedido)
    {console.log('mi pedidooooo es:', pedido);
    res.status(200).send(pedido);
        (listaPedido)=>
        {   console.log('mi pedido es:',listaPedido);
            res.status(200).send(listaPedido); //devuelvo resultado query   
            //console.log(listaContactos);    
        },
        (err)=>
        {
            res.status(500).send(err);
            console.log('mi error es:')
            console.log(err);
        }
    });
};

let insertPedido = (req,res) =>
{

    var newPedido = Pedido({
        pedido: req.body.pedido,
        cliente: req.body.cliente,
        sucursal: req.body.sucursal,
        estado: req.body.estado
    });
    console.log('pedido actual:',newPedido);
 
    newPedido.save().
    then (
        (newPedido)=>
        {
            res.status(200).send(newPedido); 
            console.log('el pedido ingreso de 10')
            console.log('pedido guardado:',newPedido)
            ;//devuelvo resultado query       
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 


};  


;


module.exports = {insertContacto, buscarContacto, getProductos, getPedido, getContacto, insertPedido}