import React, {useState} from "react";
import { Tab } from "semantic-ui-react";
import "./Contratas.scss";
import { ListContratas } from "../../../components/Admin/Contratas";



export function Contratas() {
    const [reload, setReload] = useState(false);
    const onReload = () => setReload((prevState) => !prevState);
    const panes = [
    
        {
            menuItem: "Documentos pendientes de validacion",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListContratas estado="subido" reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Documentos invalidados",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListContratas estado="invalidado" reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];
    return (
        <>
            <div className="contratas-page">
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
        </>

    )
}