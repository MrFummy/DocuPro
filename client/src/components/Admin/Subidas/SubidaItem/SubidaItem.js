import React, {useState} from "react";
import { Contrata } from "../../../../api";
import { Button, Icon, Confirm} from "semantic-ui-react";
import { ENV } from "../../../../utils";
import { useAuth } from "../../../../hooks";
import "./SubidaItem.scss";
import { BasicModal } from "../../../Shared";
import { SubidasForm } from "../SubidasForm";

const ContrataController = new Contrata();

export function SubidaItem(props){
    const {onReload} = props;
    const { accessToken } = useAuth();
    const { subida} = props;
    const baseApi = ENV.BASE_API;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);


    const openUpload = () => {
        setTitleModal(`Subir documento ${subida.titulo}`);
        onOpenCloseModal();
    };

    return (
        <>
            <div className="subida-item">
                <div className="subida-item__info">

                    {subida.solicitud && (
                        <>
                            <span className="subida-item__info-solicitud-titulo">
                               Solicitud: {subida.solicitud.titulo} 
                            </span>

                        </>
                    )}
                    <span className="subida-item__info-titulo">{subida.titulo}</span>
                    <span className="subida-item__info-descripcion">{subida.descripcion}</span>
                </div>
                <div>
                    <Button icon primary className="subida-upload-button" onClick={openUpload}>
                        <Icon name="upload"/>
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <SubidasForm onClose={onOpenCloseModal} onReload={onReload} documentId={subida._id}/>
            </BasicModal>
        </>
    );
}