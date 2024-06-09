import React, {useState} from "react";
import "./ContrataItem.scss";
import { Contrata } from "../../../../api";
import { Button, Icon, Confirm} from "semantic-ui-react";
import { ENV } from "../../../../utils";
import { useAuth } from "../../../../hooks";

const ContrataController = new Contrata();

export function ContrataItem(props){
    const { accessToken } = useAuth();
    const { contrata, onReload } = props;
    const baseApi = ENV.BASE_API;
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isValido, setIsValido] = useState(false);
    const onOpenCloseConfirm= () => setShowConfirm((prevState) => !prevState);
    const handleDownloadDocument = (url) => {
        /*const ruta = `${baseApi}/${url}`;
        //console.log(ruta);
        const link = document.createElement('a');
        link.href = url;
        link.download = '';
        link.click();*/
    };

    const openValidateConfirm = () => {
        setIsValido(true);
        setConfirmMessage(`Validar documento ${contrata.titulo}`);
        onOpenCloseConfirm();
    }

    const openInvalidateConfirm = () => {
        setIsValido(false);
        setConfirmMessage(`Invalidar documento ${contrata.titulo}`);
        onOpenCloseConfirm();
    }

    const onValidarInvalidar = async () => {
        try {
            let response = null;
            if (isValido){
                response = await ContrataController.validaDocumento(accessToken, contrata._id);
            } else {
                response = await ContrataController.invalidaDocumento(accessToken, contrata._id);
            }
            console.log(response.status);
            if (response.status === 200) {
                onOpenCloseConfirm();
                onReload();
            } 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="contrata-item">
                <div className="contrata-item__info">
                    <span className="contrata-item__info-titulo">{contrata.titulo}</span>
                    <span className="contrata-item__info-descripcion">{contrata.descripcion}</span>
                </div>
                <div>
                    <Button icon primary onClick={handleDownloadDocument(contrata.url)}>
                        <Icon name="search"/>
                    </Button>
                    <Button icon color="teal" onClick={openValidateConfirm}>
                        <Icon name="check" />
                    </Button>
                    {contrata.estado == "subido" && (
                    <Button icon color="orange" onClick={openInvalidateConfirm}>
                        <Icon name="ban" />
                    </Button>
                    )}
                </div>
            </div>
            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onValidarInvalidar}
                content={confirmMessage}
                size="mini"
            />
        </>
    );
}