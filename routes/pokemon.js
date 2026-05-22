const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

// POST: Almacenar o recibir recursos
pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;
        const [rows] = await db.query(query);
        if(rows.affectedRows==1){
            return res.status(201).json({code: 201, message: "Pokemon insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!/^[0-9]{1,3}$/.test(id)) {
        return next('route'); 
    }
    const query = `DELETE FROM pokemon WHERE pok_id=${id}`;
    const [rows] = await db.query(query);
    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Pokemon borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

pokemon.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!/^[0-9]{1,3}$/.test(id)) {
        return next('route'); 
    }

    const { pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`;
        query+= ` pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
        const [rows] = await db.query(query);

        if(rows.affectedRows==1){
            return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.patch("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!/^[0-9]{1,3}$/.test(id)) {
        return next('route'); 
    }
    if (req.body.pok_name) {
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${id}`;
        const [rows] = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

// GET: Obtener todos los pokemon
pokemon.get("/", async (req, res, next) => {
    const [pkmn] = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
});

// Validacion por si la version de express falla con el regex nativo
pokemon.get('/:id', async (req, res, next) => {
    const idParam = req.params.id;
    if (/^[0-9]{1,3}$/.test(idParam)) {
        const [pkmn] = await db.query("SELECT * FROM pokemon WHERE pok_id = " + idParam + ";");
        if (pkmn.length > 0) {
            return res.status(200).json({code: 200, message: pkmn[0]});
        } else {
            return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
        }
    } else {
        return next('route');
    }
});

// Buscar por nombre (acepta solo letras)
pokemon.get('/:name', async (req, res, next) => {
    const nameParam = req.params.name;
    if (/^[A-Za-z]+$/.test(nameParam)) {
        const [pkmn] = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + nameParam + "';");
        if (pkmn.length > 0) {
            return res.status(200).json({code: 200, message: pkmn[0]});
        } else {
            return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
        }
    } else {
        return next('route');
    }
});

module.exports = pokemon;
