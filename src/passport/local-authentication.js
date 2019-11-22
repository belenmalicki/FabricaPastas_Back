const passport =require('passport');
const User =require('../models/user');
const Prod = require('../models/products');
const Pedido = require('../models/pedidos');

//para serializar, si el cliente se va a otr pag, no le va a pedir que se loguee todo el tiempo
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser(async (id,done)=>{
    //con esto busco al usuario dentro de mi db
    const user = await User.findById(id);
    done(null, user);
});

//el metodo local-signup lo vamos a usar en la ruta
/*({}, () => {}) en las primera llaves un objeto que dice que tipos de datos recibimos del cliente
y la funcion arrow que vamos a hacer con esos datos*/
/*
passport.use('local-signup', new localStrategy({
    //email y password porque es el nombre que le di dentro de la view del signup
    usernameField:'email',
    passwordField:'password',
    //con esto permito recibir datos request(req) dentro de la funcion arrow, sirve pa cuadno le quiera pedir mas datos como dir o tel
    passReqToCallback:true
    //con el asyct await le pido que caundo termine de grabarlo siga con las otras lineas
}, async (req, email,password, done) => {
  //verifico que el cliente que el usuario ingresa para registrarse, no este en mi db
    const user = await User.findOne({email:email});
    if(user){
        return done(null, false, req.flash('signupMessage', 'El Email ya existe.'));
    }
    else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
         //el "done" es para mandarle un rta al cliente si se hizo mal te manda un null y el usuario que se registro
        done(null,newUser);

    }
  
}));*/

//usando actualemnte
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
               // newContacto.password= newContacto.encryptPassword(password);
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
                    
                        console.log(err);
                    }
                ) 
            }
            else
            {
                console.log("usu",usuario);
                res.status(501).send({estado:"El mail informado ya existe"}); //devuelvo resultado query   
                //console.log(listaContactos);    
            }
        })


};

let buscarContacto =(req, res) =>{
    let mailBusqueda = {mail:req.body.mail};
    console.log(mailBusqueda);
    let passBusqueda= req.body.password;
    console.log(passBusqueda);
    User.find(mailBusqueda,function(err,usuario)
    { 
        if (usuario.length!=0)
        {
            console.log('mail encontrado');
           for (var i = 0; i < usuario.length; i++){
            console.log(passBusqueda);
            console.log(usuario[i].password );
            
            if (usuario[i].password == passBusqueda){
              console.log('Password correcto');
              res.status(200).send(usuario);
            }
            if (usuario[i].password != passBusqueda){
                console.log('Password Incorrecto');
            res.status(501).send({estado:"Los datos ingresados son incorrectos"});
            }
          }
             
        }
        else
        {   console.log("El mail es incorrecto");
            console.log("usu",usuario);
            res.status(501).send({estado:"Los datos ingresados son incorrectos"}); //devuelvo resultado query   
        }
    });
}
    let getProductos =(req, res) =>
    {console.log('getprodcto leido');
    Prod.find(function(err,listProd)
        {
            console.log(listProd);
            res.status(200).send(listProd);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
        }
    );
};

let getContacto =(req, res, ) =>
{console.log('getcontacto leido');
let idBusqueda = {mail: req.body.mail};
console.log(idBusqueda);
User.find(idBusqueda,function(err,usuario)
    {console.log('mi contacto es:', usuario);
    res.status(200).send(usuario);
        (listaContactos)=>
        {   console.log('mi contacto es:',listaContactos);
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


let updateContacto = (req,res) => 
{
    let id = { mail : req.body.mail};
   
    console.log("update",id);
   // console.log(newContacto);
    Contactos.findOneAndUpdate({ mail : req.body.mail},{$set : {direccion: req.body.newData.direccion}},{new:true},function(err)
    {
       //console.log("respuesta",res);
       //let rta = {estado: "Ok"};
       res.status(200).send({estado:"Registro modificado"}); //devuelvo resultado query       
       (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    
    });
}
let insertPedido = (req,res) =>
{

    var newPedido = Pedido({
        pedido: req.body,
    });
    //console.log('pedido:',newPedido);
 
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



/*passport.use('local-signin', new localStrategy({
    mail:'email',
    password:'password',
    passReqToCallback:true
}, async(req, email, password, done) => {
    const user = await User.findOne({email:email});
    if(!user){
        return done(null, false,req.flash('signinMessage', "Usuario no encontrado."))
    }
    if(!user.comparePassword(password)){
        return done (null, false, req.flash('signinMessage',"Password incorrecto"))   
    }
    done(null, user)

}))*/

module.exports = {insertContacto, buscarContacto, getProductos,getContacto, insertPedido}