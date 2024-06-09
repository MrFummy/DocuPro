const mongoose = require("mongoose");
const app = require("./app");
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERSION,
} = require("./constants");
const PORT = process.env.POST || 3977;
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`;

try {
    mongoose.connect(mongoURI);
    console.log("La conexion con la BD ha sido exitosa"); 
    app.listen(PORT, () =>{
        console.log("###################");
        console.log("##### API REST ####");
        console.log("###################");
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
    });
}
catch(error){
    console.log(error);
};
