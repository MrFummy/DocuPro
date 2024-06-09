import React, {useState} from "react";
import { Tab } from "semantic-ui-react";
import "./Subidas.scss";
import { ListContratas } from "../../../components/Admin/Contratas";
import { ListSubidas } from "../../../components/Admin/Subidas";



export function Subidas() {
    const [reload, setReload] = useState(false);
    const onReload = () => setReload((prevState) => !prevState);
    const panes = [
    
        {
            menuItem: "Documentos pendientes de subida",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSubidas estado="pendiente" reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Documentos invalidados",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSubidas estado="invalidado" reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];
    return (
        <>
            <div className="subidas-page">
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
        </>

    )
}