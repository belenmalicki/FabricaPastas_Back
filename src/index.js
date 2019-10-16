/*datazo: instalé npm i nodemon -D y en el package json puse "dev":"nodemon src/index.js" .Significa que cada vez
que quiera ver si esta corriendo mi puerto y le haga modificaciones pongo en la terminal "npm run dev"
y me ahorro el tener que salir del puerto y tener que vovler a entrar en cada modificacion
*/
const express= require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport =require('passport');
const session = require('express-session');
const flash = require('connect-flash');
var bodyParser = require('body-parser');
var cors = require('cors');

//inicializaciones
const app =express();
require('./database');
require('./passport/local-authentication');

//middlewares: funcionesn que se ejecutan antes de que pasen a las rutas
//para procesar los datos que me envia el cliente

app.use(morgan('dev'));
//me permite recibir los datos desde el cliente
//el extended false dice que no voy a recibir archivos pesados tipo fotos, sino datos de un formulario(que carga el usuario)
//sarasa lo usa en true 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//estas 3 lineas de app.use  son pa hacer eso de serializacion y deserializacion
app.use(session({
    secret: 'secretSession',
    resave : false,
    saveUninitialized: false
}));
//siempre despues de sesiones y antes de passport porque es para mandar un msj que voy a esar dentro de local-auth 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/*con esto creo un middleware que llama a el mensaje que escribi dentro de local-auth(en el if) y me lo guarda
dentro de un local llamado signupMessage que me va a permitir acceder a el cada vez que lo llame
lo voy a llamar desde el view de signup*/
app.use((req, res, next)=>{
    app.locals.signupMessage=req.flash('signupMessage');
    app.locals.signinMessage=req.flash('signinMessage');
    //pa que no se tilde, next
    next();
});



/* como tengo guardas las cosas dentro de la carpeta src, el coso este no sabe donde estan las cosas
entonce tengo que usar una funcion de express que se llama path y te devuevle la ruta actual del index.js
y ese lo concateno con la carpeta views(que no deberia usar pero toy aprendiendo) */

app.set('views', path.join(__dirname,'views'));

//el ejs-mate es una plantilla y con e engine lo llamo para usar
//tarde o temprano tengo que usar mis cosas del front

app.engine('ejs', engine);

//para que me deje usarlo

app.set('view engine', 'ejs');

//seteo el puerto. Si el servidor tiene uno uso ese (process.env.PORT), sino que use el 3000
app.set('port', process.env.PORT || 3000);


//para llamar las rutas
/*express dice que uses estas rutas cada vez que el 
usuario ingrese la pag principañ */
app.use('/', require('./routes/index') );






//para verificar que anda el puerto hago el console.log e imprimo el msj y lo concateno con el puerto
app.listen(app.get('port'), () => {
    console.log('Server on Port' , app.get('port'));
});
