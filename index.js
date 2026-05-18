const bodyParser = require('body-parser');
const express = require ('express');
const app = express();
const { pokemon } = require('./pokedex.json');

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


app.post("/pokemon/", (req, res, next) => {
    return res.status(200).send(req.body.name);
});


app.get("/pokemon", (req, res, next) => {
    res.status(200);
    res.json(pokemon);
});

app.get("/pokemon/:id", (req, res, next) => {
    const parametro = req.params.id;

    // 1. SI ES UN NOMBRE (Filtramos usando .find())
    if (isNaN(parametro)) {
        const encontrado = pokemon.find(p => p.name.toLowerCase() === parametro.toLowerCase());
        
        // Operador Ternario: Si lo encuentra responde JSON, si no, salta al siguiente middleware (next)
        return encontrado ? (console.log("Encontrado por nombre:", encontrado), res.json(encontrado)) : next();
    }

    // 2. SI ES UN ID (Es un número)
    const id = parseInt(parametro, 10) - 1;

    // Operador Ternario para la validación del rango del ID
    const idValido = (id >= 0 && id < pokemon.length);
    
    return idValido ? (console.log("Encontrado por ID:", pokemon[id]), res.json(pokemon[id])) : next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("ya corrió...");
});