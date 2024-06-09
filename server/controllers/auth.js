const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const user = require("../models/user");

async function register(req, res){

    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    if(!email) res.status(400).send({ msg: "El email es obligatorio"});
    if(!password) res.status(400).send( { msg: "La contraseña es obligatoria"} );
    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false
    });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;
    //Guardamos el usuario en la base de datos
    //user.save
    try {
        await user.save();
        res.status(200).send({ msg: "Usuario guardado" });
      } catch (err) {
        res.status(400).send({ msg: `Error al crear el usuario: ${err}` });
      }
}

async function login(req, res){
    //En la peticion se nos envia email y contraseña
    const {email, password} = req.body;
    if (!email) res.status(400).send({ msg: "El email es obligatorio"});
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria"});

    const emailLowerCase = email.toLowerCase();
    try {
        const response = await User.findOne({ email: emailLowerCase});
        bcrypt.compare(password, response.password, (bcryptError, check) => {
            if(bcryptError){
                res.status(500).send({msg:"Error del servidor"});
            }else if (!check){
                res.status(400).send({msg:"Contraseña incorrecta"});
            }else if(!response.active){
                res.status(400).send({msg:"Usuario no autorizado o no activo"});
            }else{
                res.status(200).send({
                    access : jwt.createAccessToken(response),
                    refres : jwt.createRefreshToken(response)
                });
            }
        })
    } catch (err){
        res.status(500).send({msg: "Error del servidor"});  
    }
}

async function refreshAccessToken(req, res){
    //Refrescar el AccessToken a partir de un RefreshToken
    const { token } = req.body;
    const { user_id } = jwt.decoded(token);
    if(!token) res.status(400).send({msg: "Token requerido"});
    try {
        const respuesta = await User.findOne({ _id: user_id});
        res.status(200).send({
            accessToken: jwt.createAccessToken(respuesta)
        })
    } catch (err){
        res.status(500).send({msg: "Error del servidor"});
    }
}

module.exports = {
    register,
    login,
    refreshAccessToken
};