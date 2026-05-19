const express = require('express');
const pokemon = express.Router();
const { pokemon: pk } = require('../pokedex.json');

// POST: Almacenar o recibir recursos
pokemon.post("/", (req, res, next) => {
    // Si usas x-www-form-urlencoded y quieres ver el JSON estructurado en Postman, devuélvelo como objeto:
    return res.status(200).json({ nombreRecibido: req.body.name });
});

// GET: Obtener todos los pokemon
pokemon.get("/", (req, res, next) => {
    res.status(200);
    res.json(pk); // 👈 Enviamos la lista de datos 'pk', no el router
});

// GET: Obtener un pokemon por ID o por Nombre
pokemon.get("/:id", (req, res, next) => {
    const parametro = req.params.id;

    // 1. SI ES UN NOMBRE (Filtramos usando .find() sobre la data 'pk')
    if (isNaN(parametro)) {
        const encontrado = pk.find(p => p.name.toLowerCase() === parametro.toLowerCase());
        
        return encontrado ? (console.log("Encontrado por nombre:", encontrado), res.json(encontrado)) : next();
    }

    // 2. SI ES UN ID (Es un número)
    const id = parseInt(parametro, 10) - 1;

    // Validación del rango usando 'pk.length'
    const idValido = (id >= 0 && id < pk.length);
    
    return idValido ? (console.log("Encontrado por ID:", pk[id]), res.json(pk[id])) : next();
});

module.exports = pokemon;