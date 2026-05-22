const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

// POST: Almacenar o recibir recursos
// POST: Almacenar o recibir recursos
pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
    query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;    console.log("Cuerpo recibido en el servidor:", req.body);
    
    const rows = await db.query(query);
    if(rows.affectedRows == 0) {
        return res.status(200).json(query);
    }
    //return res.status(200).json(req.body);
});

// GET: Obtener todos los pokemon
pokemon.get("/", async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(201).json({ nombreRecibido: req.body.name });
});

pokemon.get("/:id", async (req, res, next) => {
    const parametro = req.params.id;

    // 1. SI ES UN NOMBRE
    if (isNaN(parametro)) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + parametro + "';");
        
        if (pkmn.length > 0) {
            return res.status(201).json({ code: 1, message: pkmn[0] });
        }
        return res.status(404).json({ code: 404, message: "Pokémon no encontrado" });
    }

    const id = parseInt(parametro, 10);

    if (id >= 1 && id <= 722) { // Rango manual como el del video
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id + ";");
        
        if (pkmn.length > 0) {
            return res.status(200).json({ code: 1, message: pkmn[0] });
        }
    }
    
    // Si no entra en el rango o no se encuentra el ID
    return res.status(404).json({ code: 404, message: "Pokémon no encontrado" });
});

module.exports = pokemon;