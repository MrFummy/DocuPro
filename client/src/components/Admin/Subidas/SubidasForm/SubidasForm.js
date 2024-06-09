import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { Contrata } from "../../../../api";
import { useAuth } from "../../../../hooks";

const contrataController = new Contrata();

export function SubidasForm({ onClose, onReload, documentId }) {
    const { accessToken, user } = useAuth();

    const formik = useFormik({
        initialValues: {
            archivo: null,
        },
        validationSchema: Yup.object({
            archivo: Yup.mixed().required("El archivo es obligatorio"),
        }),
        onSubmit: async (values) => {
            try {
                await contrataController.uploadDocumento(accessToken, documentId, values.archivo, user.id);
                //await contrataController.updateDocumento(accessToken, documentId, { estado: 'subido' });
                onClose(); // Cerrar el formulario
                onReload(); // Recargar la lista de documentos
            } catch (error) {
                console.error('Error al subir el documento:', error);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                type="file"
                name="archivo"
                onChange={(event) => formik.setFieldValue("archivo", event.currentTarget.files[0])}
                error={formik.errors.archivo ? { content: formik.errors.archivo } : null}
            />
            <Button type="submit" primary>
                Subir
            </Button>
            <Button type="button" onClick={onClose}>
                Cancelar
            </Button>
        </Form>
    );
}