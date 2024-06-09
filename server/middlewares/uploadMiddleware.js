const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempPath = path.join(__dirname, '..', 'temp'); // Carpeta temporal

        // Verifica si la carpeta existe, si no, crea la carpeta
        fs.mkdirSync(tempPath, { recursive: true });

        cb(null, tempPath); // Configura la carpeta de destino temporal
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`); // Nombre del archivo subido
    }
});

const upload = multer({ storage: storage });

module.exports = upload;