import React, { useEffect, useState } from "react";
import { Form, Dropdown, Icon } from "semantic-ui-react";
import axios from "axios";
import { ENV } from "../../../../utils";
import { useAuth } from "../../../../hooks";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./SolicitudForm.form";
import "./SolicitudForm.scss";

export function SolicitudForm(props) {
    const {onClose, onReload, solicitud, documentos} = props;
    const baseApi = ENV.BASE_API;
    const { accessToken } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    axios.defaults.baseURL = baseApi;

    useEffect(() => {
        console.log(documentos);
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users?active=true', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const userOptions = response.data.map(user => ({
                    key: user._id,
                    text: `${user.firstname} ${user.lastname}`,
                    value: user._id
                }));
                setUsers(userOptions);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los usuarios activos', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [accessToken, baseApi]);

    const formik = useFormik({
        initialValues: initialValues(solicitud),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (solicitud) {
                    // Actualizar solicitud existente
                    await axios.patch(`/solicitud/${solicitud._id}`, {
                        titulo: formValue.titulo,
                        descripcion: formValue.descripcion,
                        solicitante: formValue.solicitante,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    // Actualizar documentos asociados
                    /*const documentosPromises = formValue.documents.map((doc) => {
                        if (doc.id) {
                            return axios.put(`/documento/${doc.id}`, {
                                titulo: doc.titulodoc,
                                descripcion: doc.descripciondoc,
                                solicitud: solicitud._id,
                                estado: "pendiente"
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                        } else {
                            return axios.post('/documento', {
                                titulo: doc.titulodoc,
                                descripcion: doc.descripciondoc,
                                solicitud: solicitud._id,
                                estado: "pendiente"
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                        }
                    });
                    await Promise.all(documentosPromises);*/
                } else {
                    // Crear nueva solicitud
                    const solicitudResponse = await axios.post('/solicitud', {
                        titulo: formValue.titulo,
                        descripcion: formValue.descripcion,
                        solicitante: formValue.solicitante,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    const solicitudId = solicitudResponse.data.id;

                    // Crear documentos
                    const documentosPromises = formValue.documents.map(doc => {
                        return axios.post('/documento', {
                            titulo: doc.titulodoc,
                            descripcion: doc.descripciondoc,
                            solicitud: solicitudId,
                            estado: "pendiente"
                        }, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                    });
                    await Promise.all(documentosPromises);
                }

                // Mostrar un mensaje de éxito o redirigir, etc.
                console.log('Solicitud y documentos guardados con éxito');
                onReload();
                onClose();

            } catch (error) {
                console.error('Error al guardar la solicitud y los documentos', error);
            }
        }
    });

    return (
        <Form className="solicitud-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="titulo"
                placeholder="Titulo de la solicitud"
                onChange={formik.handleChange}
                value={formik.values.titulo}
                error={formik.errors.titulo && { content: formik.errors.titulo }}
            />
            <Form.TextArea
                name="descripcion"
                placeholder="Descripcion de la solicitud"
                onChange={formik.handleChange}
                value={formik.values.descripcion}
                error={formik.errors.descripcion && { content: formik.errors.descripcion }}
            />
            <Dropdown
                name="solicitante"
                placeholder="Asignado a"
                fluid
                selection
                options={users}
                loading={loading}
                disabled={loading}
                onChange={(e, { value }) => {
                    formik.setFieldValue("solicitante", value);}}
                value={formik.values.solicitante}
                error={formik.errors.solicitante && { content: formik.errors.solicitante }}
            />
            {formik.values.documents.map((document, index) => (
                <Form.Group key={index} className="documentos">
                    <Form.Input
                        name={`documents[${index}].titulodoc`}
                        placeholder="Titulo del documento"
                        value={document.titulodoc}
                        onChange={formik.handleChange}
                        error={formik.errors.documents && formik.errors.documents[index] && formik.errors.documents[index].titulodoc && { content: formik.errors.documents[index].titulodoc }}
                    />
                    <Form.TextArea
                        name={`documents[${index}].descripciondoc`}
                        placeholder="Descripcion del archivo solicitado"
                        value={document.descripciondoc}
                        onChange={formik.handleChange}
                        error={formik.errors.documents && formik.errors.documents[index] && formik.errors.documents[index].descripciondoc && { content: formik.errors.documents[index].descripciondoc }}
                    />
                    {formik.values.documents.length > 1 && (
                        <Form.Button icon onClick={() => {
                            const newDocuments = [...formik.values.documents];
                            newDocuments.splice(index, 1);
                            formik.setFieldValue('documents', newDocuments);
                        }}>
                            <Icon name="minus circle" />
                        </Form.Button>
                    )}
                </Form.Group>
            ))}
            <Form.Button icon onClick={() => {
                const newDocuments = [...formik.values.documents, { titulodoc: '', descripciondoc: '' }];
                formik.setFieldValue('documents', newDocuments);
            }}>
                <Icon name="plus circle" />
            </Form.Button>
            <div className="submit-container">
                <Form.Button type="submit" primary fluid className="submit-button" loading={formik.isSubmitting}>
                    {solicitud ? "Actualizar Solicitud" : "Crear Solicitud"}
                </Form.Button>
            </div>
        </Form>
    );
}