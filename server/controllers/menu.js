const Menu = require("../models/menu");


async function createMenu(req, res){
    const menu = new Menu(req.body);
    try{
        await menu.save();
        res.status(200).send({ msg: "Menu creado" });
    } catch (err) {
        res.status(400).send({ msg: `Error al crear el menu: ${err}` });
    }
}

async function getMenu(req, res){
    const {active} = req.query;
    let response = null;

    if(active === undefined) {
        response = await Menu.find().sort( { order: "asc" });
    }else {
        response = await Menu.find({ active }).sort( { order: "asc" });
    }
    if (!response){
        res.status(400).send({msg: "No se ha encontrado ningun menu"});
    } else {
        res.status(200).send(response);
    }
    
}

async function updateMenu(req, res){
    const { id } = req.params;
    const menuData = req.body;
    //Buscamos y actualizamos el menu
    try{
        await Menu.findByIdAndUpdate({ _id:id }, menuData);
        res.status(200).send({ msg: "Menu modificado" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al actualizar el menu: ${err}` });
    }
}

async function deleteMenu(req, res){
    const { id } = req.params;
    try{
        await Menu.findByIdAndDelete({ _id:id });
        res.status(200).send({ msg: "Menu eliminado" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al eliminar el menu: ${err}` });
    }
}

module.exports = {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,
};