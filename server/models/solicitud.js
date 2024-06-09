const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SolicitudSchema = mongoose.Schema({
    titulo: String,
    descripcion: String,
    solicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fechasolicitud: {
        type: Date,
        default: Date.now.Date
    },
    path: String,
    estado: Boolean,
});

SolicitudSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Solicitud", SolicitudSchema);