import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'


//conectar la base de datos.
db.authenticate()
    .then(() => console.log('Base De Datos Conectada'))
    .catch(error => console.log(error));


const app = express();

const port = process.env.PORT || 4000;


//habilitar pug.
app.set('view engine', 'pug');

//obtener el año actual.
app.use((req,res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio="Agencia De Viajes"
    next();
})
//agregar body parser para leer los datos de el formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica.
app.use(express.static('public'));

//agregar router.
app.use('/', router);

app.listen(port, () =>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
});