import React, { useState, useEffect} from "react";
import { Contrata } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Loader } from "semantic-ui-react";
import {size, map } from "lodash";
import { ContrataItem } from "../ContrataItem";

const contrataController = new Contrata();

export function ListContratas(props){
    const {estado, reload, onReload} = props;
    const { accessToken } = useAuth();
    const [contratas, setContrata] = useState(null);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await contrataController.getDocumentos(estado);
                setContrata(response.docs);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [estado, reload]);

    if(!contratas) return <Loader active inline="centered" />
    if(size(contratas) === 0) return "No hay documentos pendientes";

    return (
        <div>
            {map(contratas, (contrata) => (
                <ContrataItem key={contrata._id} contrata={contrata} onReload={onReload}/>
            ))}
        </div>
    );

}
