const express = require("express");
const SolicitudController = require("../controllers/solicitud");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/solicitud", [md_auth.asureAuth], SolicitudController.createSolicitud);
api.get("/solicitud", SolicitudController.getSolicitud);
api.patch("/solicitud/:id", [md_auth.asureAuth], SolicitudController.updateSolicitud);
api.delete("/solicitud/:id", [md_auth.asureAuth], SolicitudController.deleteSolicitud);

module.exports = api;