import * as Yup from "yup";

export function initialValues(solicitud, documentos) {
    return {
        titulo: solicitud?.titulo || "",
        descripcion: solicitud?.descripcion || "",
        solicitante: solicitud?.solicitante || "",
        documents: documentos?.map(doc => ({
            id: doc._id,
            titulodoc: doc.titulodoc,
            descripciondoc: doc.descripciondoc
        })) || [{ titulodoc: '', descripciondoc: '' }],
    };
}

export function validationSchema() {
    return Yup.object({
        titulo: Yup.string().required("El título es obligatorio"),
        descripcion: Yup.string().required("La descripción es obligatoria"),
        solicitante: Yup.string().required("El solicitante es obligatorio"),
        documents: Yup.array().of(
            Yup.object().shape({
                titulodoc: Yup.string().required("El título del documento es obligatorio"),
                descripciondoc: Yup.string().required("La descripción del documento es obligatoria"),
            })
        ),
    });
}
