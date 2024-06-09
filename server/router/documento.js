const express = require("express");
const DocumentoController = require("../controllers/documento");
const md_auth = require("../middlewares/authenticated");
const upload = require('../middlewares/uploadMiddleware');

const api = express.Router();

api.post("/documento", [md_auth.asureAuth], DocumentoController.createDocumento);
api.get("/documento", DocumentoController.getDocumento);
api.patch("/documento/:id", [md_auth.asureAuth], DocumentoController.updateDocumento);
api.delete("/documento/:id", [md_auth.asureAuth], DocumentoController.deleteDocumento);
api.post('/upload', [md_auth.asureAuth, upload.single('documento')], DocumentoController.uploadDocumento);
api.patch("/documento/valida/:id", [md_auth.asureAuth], DocumentoController.validaDocumento);
api.patch("/documento/invalida/:id", [md_auth.asureAuth], DocumentoController.invalidaDocumento);

module.exports = api;