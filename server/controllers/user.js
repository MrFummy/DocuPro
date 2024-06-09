const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");
async function getMe(req, res){
    
    const { user_id } = req.user;
    const response = await User.findById(user_id);
    if(!response){
        res.status(400).send({msg: "No existe el usuario"});
    } else {
        res.status(200).send(response);
    }
}

async function getUser(req, res){
    
    const { id } = req.params;
    const response = await User.findById(id);
    if(!response){
        res.status(400).send({msg: "No existe el usuario"});
    } else {
        res.status(200).send(response);
    }
}

async function getUsers(req, res){
    const {active} = req.query;
    let response = null;

    if(active === undefined) {
        response = await User.find();
    }else {
        response = await User.find({ active });
    }
    res.status(200).send(response);
}

async function createUser(req, res){
    const { password } = req.body;
    const user = new User({ ...req.body, active: false});
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword;
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }
    try {
        await user.save();
        res.status(200).send({ msg: "Usuario guardado" });
    } catch (err) {
        res.status(400).send({ msg: `Error al crear el usuario: ${err}` });
    }
}

async function updateUser(req, res){
    const { id } = req.params;
    const userData = req.body;
    //Comprobamos password
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hasPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hasPassword;
    } else {
        delete userData.password;
    }
    //Comprobamos Avatar
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }
    //Buscamos y actualizamos usuario
    try{
        await User.findByIdAndUpdate({ _id:id }, userData);
        res.status(200).send({ msg: "Usuario modificado" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al actualizar el usuario: ${err}` });
    }
}

async function deleteUser(req, res){
    const { id } = req.params;
    try{
        await User.findByIdAndDelete({ _id:id });
        res.status(200).send({ msg: "Usuario eliminado" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al eliminar el usuario: ${err}` });
    }
}

module.exports = {
    getMe,
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};