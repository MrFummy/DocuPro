const Newsletter = require("../models/newsletter");

async function suscribeEmail(req, res){
    const {email} = req.body;
    if (!email) res.status(400).send({ msg: `Email obligatorio` });
    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    });
    try{
        await newsletter.save();
        res.status(200).send({ msg: "Email registrado" });
    } catch {
        res.status(400).send({ msg: `Error al registrar el email` });
    }
}

async function getSubscribers(req, res){
    const { page = 1, limit = 10 } = req.query;
    let response = null;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };
    try {
        response = await Newsletter.paginate({}, options);
        res.status(200).send(response);
    }
    catch (err){
        res.status(400).send({ msg: "No se ha encontrado ningun suscriptor" });
    }
}

async function deleteEmail(req, res){
    const { id } = req.params;
    try{
        await Newsletter.findByIdAndDelete({ _id:id });
        res.status(200).send({ msg: "Email eliminado" });
        
    } catch (err) {
        res.status(400).send({ msg: "Error al eliminar el email" });
    }
}

module.exports = {
    suscribeEmail,
    getSubscribers,
    deleteEmail,
};
