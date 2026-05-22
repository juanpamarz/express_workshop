
const morgan = require('morgan');
const express = require("express");
const app = express();

// Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
// Middleware
const auth = require('../middleware/auth');
const notFound = require('../middleware/notFound');
const indexDos = require('../middleware/indexDos');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas Públicas
app.get("/", indexDos);
app.use("/user", user);

// Rutas Protegidas (Requieren Token)
app.use(auth);
app.use("/pokemon", pokemon);

// Manejador final
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});