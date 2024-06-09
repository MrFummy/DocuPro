const Documento = require("../models/documento");
const path = require('path');
const fs = require('fs');

async function createDocumento(req, res){
        try {
            const { solicitud, titulo, descripcion, estado } = req.body;
    
            if (!solicitud) {
                return res.status(400).send({ msg: 'El ID de la solicitud es requerido' });
            }
    
            const documentData = {
                titulo,
                descripcion: descripcion || '',
                estado: estado || 'pendiente',
                solicitud: solicitud,
                fechasubida: null,  // Fecha de subida será null hasta que se suba un archivo
                uploader: null,     // Uploader será null hasta que se suba un archivo
                url: null           // URL será null hasta que se suba un archivo
            };
    
            const newDocument = new Documento(documentData);
            await newDocument.save();
    
            res.status(200).send({ msg: 'Documento creado exitosamente', document: newDocument });
        } catch (err) {
            res.status(500).send({ msg: `Error al crear el documento: ${err.message}` });
        }
}

const getDocumento = async (req, res) => {
    try {
        const { solicitud, estado, page = 1, limit = 10 } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { fechasubida: -1 }, // Ordenar por fecha de subida descendente
            populate: { path: 'solicitud', model: 'Solicitud' }
        };

        let documents;
        if (solicitud) {
            // Buscar documentos que correspondan al ID de la solicitud con paginación
            if (estado) {
                documents = await Documento.paginate({ solicitud: solicitud },{ estado: estado}, options);
            } else {
            documents = await Documento.paginate({ solicitud: solicitud }, options);
            }
        } else {
            // Obtener todos los documentos con paginación
            if (estado) {
                documents = await Documento.paginate({ estado: estado }, options);
            } else {
                documents = await Documento.paginate({}, options);
            }
            
        }

        if (!documents || documents.docs.length === 0) {
            return res.status(404).send({ msg: 'No se encontraron documentos' });
        }

        res.status(200).send(documents);
    } catch (err) {
        res.status(500).send({ msg: `Error al obtener los documentos: ${err.message}` });
    }
}


async function updateDocumento(req, res){
    const { id } = req.params;
    const documentoData = req.body;
    //Buscamos y actualizamos la solicitud
    try{
        await Documento.findByIdAndUpdate({ _id:id }, documentoData);
        res.status(200).send({ msg: "Documento modificado" });
        
    } catch (err) {
        res.status(400).send({ msg: `Error al actualizar el documento: ${err}` });
    }
}

async function deleteDocumento(req, res) {
    const { id } = req.params;

    try {
        // Verificar si el ID pertenece a una solicitud
        const solicitud = await Solicitud.findById(id);

        if (solicitud) {
            // Eliminar todos los documentos asociados a la solicitud
            await Documento.deleteMany({ solicitud: id });
            res.status(200).send({ msg: "Todos los documentos asociados a la solicitud eliminados" });
        } else {
            // Eliminar un documento específico
            await Documento.findByIdAndDelete(id);
            res.status(200).send({ msg: "Documento eliminado" });
        }
    } catch (err) {
        res.status(400).send({ msg: `Error al eliminar el documento: ${err}` });
    }
}

async function uploadDocumento(req, res) {
    try {
        const { id } = req.body;

        if (!req.file) {
            return res.status(400).send({ msg: 'No se ha subido ningún archivo' });
        }

        const document = await Documento.findById(id);

        if (!document) {
            return res.status(404).send({ msg: 'Documento no encontrado' });
        }

        const solicitudId = document.solicitud.toString();
        const targetPath = path.join(__dirname, '..', 'uploads', 'documentos', solicitudId);

        // Verifica si la carpeta existe, si no, crea la carpeta
        fs.mkdirSync(targetPath, { recursive: true });

        const newFileName = `${document._id}${path.extname(req.file.originalname)}`;
        const targetFile = path.join(targetPath, newFileName);

        // Mueve el archivo desde la carpeta temporal a la carpeta final
        fs.renameSync(req.file.path, targetFile);

        document.titulo = newFileName;
        document.uploader = req.user._id;
        document.fechasubida = new Date();
        document.estado = "subido";
        document.url = path.join('uploads', 'documentos', solicitudId, newFileName);
        await document.save();

        res.status(200).send({ msg: 'Documento subido exitosamente', document });
    } catch (err) {
        res.status(500).send({ msg: `Error al subir el documento: ${err.message}` });
    }
}

async function validaDocumento(req, res) {
    const { id } = req.params;
    try {
        const document = await Documento.findById(id);
        if (!document) {
            return res.status(404).send({ msg: 'Documento no encontrado' });
        }
        document.estado = 'validado';
        await document.save();
        res.status(200).send({ msg: 'Documento validado exitosamente', document });
    } catch (err) {
        res.status(500).send({ msg: `Error al validar el documento: ${err.message}` });
    }
}

async function invalidaDocumento(req, res) {
    const { id } = req.params;
    try {
        const document = await Documento.findById(id);
        if (!document) {
            return res.status(404).send({ msg: 'Documento no encontrado' });
        }
        document.estado = 'invalidado';
        await document.save();
        res.status(200).send({ msg: 'Documento invalidado exitosamente', document });
    } catch (err) {
        res.status(500).send({ msg: `Error al invalidar el documento: ${err.message}` });
    }
}





module.exports = {
    createDocumento,
    getDocumento,
    updateDocumento,
    deleteDocumento,
    uploadDocumento,
    validaDocumento,
    invalidaDocumento,
};