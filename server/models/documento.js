const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const DocumentSchema = mongoose.Schema({
    titulo: String,
    descripcion: String,
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    fechasubida: Date,
    url: String,
    estado: String,
    solicitud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solicitud', // Asumiendo que tienes un modelo Solicitud
    },
});
DocumentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Documento", DocumentSchema);