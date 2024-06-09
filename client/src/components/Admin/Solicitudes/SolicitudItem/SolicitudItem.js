import React, {useState } from "react";
import "./SolicitudItem.scss";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import {SolicitudForm} from "../SolicitudForm";
import { ENV } from "../../../../utils";
import axios from "axios";
import {useAuth } from "../../../../hooks";


export function SolicitudItem(props) {
    const { solicitud, onReload } = props;
    const { accessToken } = useAuth();
    const baseApi = ENV.BASE_API;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [documentos, setDocumentos] = useState([]);
    axios.defaults.baseURL = baseApi;

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateSolicitud = async () => {
        setTitleModal(`Actualizar ${solicitud.titulo}`);
        await fetchDocuments();
        onOpenCloseModal();
    };

    const onDelete = async () => {
        try {
            // Verificar si hay documentos asociados
            await fetchDocuments();

            if (documentos.length > 0) {
                // Eliminar documentos asociados
                await axios.delete(`/documento`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    params: {
                        id: solicitud._id,
                        type: 'solicitud'
                    }
                });
            }

            // Eliminar solicitud
            await axios.delete(`/solicitud/${solicitud._id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            onReload();
        } catch (error) {
            console.error('Error al eliminar la solicitud y los documentos', error);
        }
        onOpenCloseConfirm();
    };
    
    const fetchDocuments = async () => {
        console.log(solicitud._id);
        try {
            const response = await axios.get(`/documento?solicitud=${solicitud._id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`  
                }
            });
            setDocumentos(response.data);
        } catch (error) {
            console.error('Error al obtener los documentos asociados', error);
        }
    };

    return (
        <>
            <div className="solicitud-item">
                <div className="solicitud-item__info">
                    <div>
                        <p>{solicitud.titulo}</p>
                        <p>{solicitud.descripcion}</p>
                    </div>
                </div>
                <div className="solicitud-item__botones">
                    <span>Usuario asignado:  </span>   
                    <Image  className= "avatar" src={`${ENV.BASE_PATH}/${solicitud.user.avatar}`} title={`${solicitud.user.firstname} ${solicitud.user.lastname}`}/>
                    <Button icon as="a" href={solicitud.url} target="_blank">
                        <Icon name="eye" />
                    </Button>
                    <Button icon primary onClick={openUpdateSolicitud}>
                        <Icon name="pencil" />
                    </Button>
                    <Button icon color="red" onClick={onOpenCloseConfirm}>
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <SolicitudForm onClose={onOpenCloseModal} onReload={onReload} solicitud={solicitud} documentos={documentos}/>
            </BasicModal>

            <Confirm 
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Eliminar la solicitud ${solicitud.titulo} y sus documentos`}
                size="mini"
            />
        </>
    );
}