import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import "./Documentacion.scss";
import { ListSolicitud, SolicitudForm } from "../../../components/Admin/Solicitudes";

export function Documentacion() {
    const [showModal, setShowModal] = useState(false);
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState );
    const [reload, setReload] = useState(false);
    const onReload = () => setReload((prevState) => !prevState );
    const panes = [
        {
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSolicitud reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            <div className="documentacion-page">
                <div className="documentacion-page__add">
                    <Button primary onClick={onOpenCloseModal}>
                       Nueva solicitud 
                    </Button>
                </div>
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title="Crear solicitud de documentacion">
                <SolicitudForm onClose={onOpenCloseModal} onReload={onReload}/>     
            </BasicModal>
        </>
    )
}