import React, {useState} from "react";
import "./EmailItem.scss";
import {Button, Icon, Confirm} from "semantic-ui-react";
import {  Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function EmailItem(props) {
    const { email, onReload } = props;
    const { accessToken } = useAuth();
    const emailController = new Newsletter();
    const [showConfirm, setShowConfirm] = useState(false);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    const onDelete = async () => {
        try {
            //console.log(email._id);
            await emailController.deleteEmail(accessToken, email._id);

        } catch (error) {
            console.error('Error al eliminar el email', error);
        }
        onReload();
        onOpenCloseConfirm();
    };
    
    return (
        <>
            <div className="email-item">
                    <span>{email.email}</span>
                <div>
                    <Button Icon color="red" onClick={onOpenCloseConfirm} className="email-delete-button">
                        <Icon name="trash"/>
                    </Button>
                </div>
            </div>
            <Confirm 
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Eliminar el email ${email.email}`}
                size="mini"
            />
        </>
    );
}