// Dependencias
const morgan = require('morgan');
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importa CORS para permitir peticiones desde el navegador

// Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

// Middlewares
// (Si prefieres usar tus archivos de la carpeta /middleware, 
// puedes sustituir estas líneas por los 'require' correspondientes)
const notFound = require('./middleware/notFound');
const indexDos = require('./middleware/indexDos');

// Configuración de la App
app.use(cors()); // Habilita el acceso desde tu sitio web
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas Públicas
app.get("/", indexDos);
app.use("/user", user); // Registro y Login

// Middleware de Seguridad (Autenticación)
app.use((req, res, next) => {
    try {
        // Busca el token en el header 'Authorization'
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next(); // Si es válido, continúa
    } catch (error) {
        return res.status(401).json({ code: 401, message: "No tienes permiso :(" });
    }
});

// Rutas Protegidas (Requieren Token)
app.use("/pokemon", pokemon);

// Manejador de 404
app.use(notFound);

// Servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});