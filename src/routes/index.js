//para las rutas principales

const express = require('express');
const router = express.Router();
const passport= require('passport');
let pastaController = require('../passport/local-authentication');



//famosos endpoint

//este es la pag principal, lo primero que el usuario ve
//req resp y next son manejadores depeticiones
router.get('/', function(req, res)
{
    //si no renderizo, no me muestra los mensajes de la view
    res.json({
        status: 'funciona',
        message: 'Holixx'
    });
});

//el get es para que el usuiario me pida, en este caso con la ruta /signup
//le voy a devovler una ventana donde ingresar sus datos para registrarse 
router.get('/signup', (req, res, next) =>{
    //cuando el usuario ingrese a esta ruta, le mostrara la vista del signup view
    res.render('signup');
});

/*con esta ruta /signup pero que es .post , cuando haga click en registrar voy a recibir los datos que el usuario cargo
en la ventana que le envié
Lo que a hacer es autenticar los datos del local-signup(que esta el local-authentication) y si 
ingreso bien lo redirige a la ruta profile, sino lo vuevle a mandar al signup*/

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true,
}));

//lo mismo para cuando el usuario
router.get('/signin', (req, res, next) =>{
    res.render('signin');

});
router.post('/signin', passport.authenticate ('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true,
}));

router.get('/logout', (req,res,next) =>{
    req.logout();
    res.redirect('/');
});






router.post('/insertContacto',function(req,res)
{
    console.log(req.body);
    pastaController.insertContacto(req,res);
    successRedirect:'/';
});

/*el isAuthenticated me va averificar que el usuario este loguedo, si lo esta, va a ingresar a profile, sino
me manda  al a pagina principal */
router.get('/profile', isAuthenticated, (req, res, next)=> {
    res.render('profile');
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};


module.exports = router;