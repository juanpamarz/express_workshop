const morgan = require('morgan');
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken'); // Necesitas importar jwt aquí

const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    return res.status(200).json({ code: 1, message: "Bienvenido al Pokédex" });
});

app.use("/user", user); // Registro y Login público

// Middleware de seguridad (inline, como en tu captura)
app.use((req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ code: 401, message: "No tienes permiso :(" });
    }
});

// Ahora sí, esta ruta está protegida por el middleware de arriba
app.use("/pokemon", pokemon);

app.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: "URL no encontrada" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});