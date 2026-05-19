const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

// POST: Almacenar o recibir recursos
pokemon.post("/", (req, res, next) => {
    // Si usas x-www-form-urlencoded y quieres ver el JSON estructurado en Postman, devuélvelo como objeto:
    return res.status(200).json({ nombreRecibido: req.body.name });
});

// GET: Obtener todos los pokemon
pokemon.get("/", async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

// GET: Obtener un pokemon por ID o por Nombre
pokemon.get("/:id", async (req, res, next) => {
    const parametro = req.params.id;

    // 1. SI ES UN NOMBRE (Filtramos usando SQL)
    if (isNaN(parametro)) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE name = ?", [parametro]);
        
        return pkmn.length ? (console.log("Encontrado por nombre:", pkmn[0]), res.json(pkmn[0])) : next();
    }

    // 2. SI ES UN ID (Es un número)
    const id = parseInt(parametro, 10);
    const pkmn = await db.query("SELECT * FROM pokemon WHERE id = ?", [id]);
    
    return pkmn.length ? (console.log("Encontrado por ID:", pkmn[0]), res.json(pkmn[0])) : next();
});

module.exports = pokemon;