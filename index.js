const express = require ('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.get ("/", (req, res, next)=>{
    res.status(200);
    res.send("Bienvenido a la Pokedex");
});


app.get("/pokemon/all", (req, res, next)=>{
    res.status(200);
    res.json(pokemon);
});
//HICE MODIFICACIONES EN EL APP GET PORQUE LAS VERSIONES DE EXPRESS YA NO ACEPTABAN LO QUE DICE EL VIDEO. 
app.get("/pokemon/:id", (req, res, next) => {
    const parametro = req.params.id;

    if (isNaN(parametro)) {
        const encontrado = pokemon.find(p => p.name.toLowerCase() === parametro.toLowerCase());
        
        if (encontrado) {
            return res.json(encontrado);
        } else {
            return next();
        }
    }

    const id = parseInt(parametro, 10) - 1;

    if (id >= 0 && id < pokemon.length) {
        return res.json(pokemon[id]);
    } else {
        return next();
    }
});


app.listen(process.env.PORT ||3000, ()=>{
    console.log("ya corrió...");
});