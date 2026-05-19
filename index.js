const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require ('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET ES PARA OBTENER RECURSOS
// POST ES PARA ALMACENAR RECURSOS O CREAR RECURSOS
// PUT ES MODIFICAR RECURSOS
// PATCH PARA MODIFICAR PARCIALMENTE RECURSOS
// DELETE ES PARA ELIMINAR RECURSOS
app.get ("/", (req, res, next) => {
    res.status(200).send("Bienvenido a la Pokedex");
});
app.use("/pokemon", pokemon);



app.listen(process.env.PORT || 3000, () => {
    console.log("ya corrió...");
});