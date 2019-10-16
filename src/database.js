const mongoose= require('mongoose');
const { mongodb } = require('./keys');
/* como el mexicano hace todo separado yo tambie, entonces importo desde las key el objeto mongodb donde esta mi url
de coneccion con mongodb online.
Uso el connecto y muestro si se conceto(.then) la database esta conectada, sino(.catch) muestra el error que recibi  */

mongoose.connect(mongodb.URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('Database conectada'))
.catch(err => console.error(err));