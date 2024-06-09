const Solicitud = require("../models/solicitud");

async function createSolicitud(req, res) {
    const { user_id } = req.user;
    const solicitud = new Solicitud(req.body);
    //solicitud.solicitante = user_id;
    solicitud.fechasolicitud = Date.now();
    try {
        const savedSolicitud = await solicitud.save();
        res.status(200).send({ msg: "Solicitud creada", id: savedSolicitud._id });
    } catch (err) {
        res.status(400).send({ msg: `Error al crear la solicitud: ${err}` });
    }
}

async function getSolicitud(req, res) {
    const { estado, page = 1, limit = 100 } = req.query; // obtener page y limit de los query params
    let response = null;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { order: "asc" }
    };

    try {
        console.log("Buscando solicitudes con los siguientes parámetros:", { estado, options });

        if (estado === undefined) {
            response = await Solicitud.paginate({}, options);
        } else {
            response = await Solicitud.paginate({ estado }, options);
        }
        if (!response || response.docs.length === 0) {
            res.status(400).send({ msg: "No se ha encontrado ninguna solicitud" });
        } else {
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({ msg: "Error al obtener las solicitudes", error });
    }
}

async function updateSolicitud(req, res){
    const { id } = req.params;
    const solicitudData = req.body;
    //Buscamos y actualizamos la solicitud
    try{
        await Solicitud.findByIdAndUpdate({ _id:id }, solicitudData);
        res.status(200).send({ msg: "Solicitud modificada" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al actualizar la solicitud` });
    }
}

async function deleteSolicitud(req, res){
    const { id } = req.params;
    try{
        await Solicitud.findByIdAndDelete({ _id:id });
        res.status(200).send({ msg: "Solicitud eliminada" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al eliminar la solicitud` });
    }
}

module.exports = {
    createSolicitud,
    getSolicitud,
    updateSolicitud,
    deleteSolicitud,
};
