import React, { useState, useEffect} from "react";
import { Contrata } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Loader } from "semantic-ui-react";
import {size, map } from "lodash";
import {SubidaItem } from "../SubidaItem";


const contrataController = new Contrata();

export function ListSubidas(props){
    const {estado, reload, onReload} = props;
    const { accessToken, user } = useAuth();
    const [subidas, setSubidas] = useState(null);
    
    useEffect(() => {
        (async () => {
            try {
                //console.log(estado);
                // Obtener documentos con estado pendiente o invalidado
                const response = await contrataController.getDocumentos(estado);
                //console.log(response);
                // Verificar que response.docs es un array
                if (!Array.isArray(response.docs)) {
                    console.error("response.docs no es un array", response.docs);
                    return;
                }
                // Filtrar los documentos por usuario asignado a la solicitud
                const documentosFiltrados = response.docs.filter(doc => doc.solicitud.solicitante === user._id);
                setSubidas(documentosFiltrados);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [estado, accessToken, user]);

    if(!subidas) return <Loader active inline="centered" />
    if(size(subidas) === 0) return "No hay documentos pendientes";

    return (
        <div>
            {map(subidas, (subida) => (
                <SubidaItem key={subida._id} subida={subida} onReload={onReload}/>
            ))}
        </div>
    );

}