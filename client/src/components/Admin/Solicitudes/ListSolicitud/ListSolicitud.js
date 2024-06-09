import React, { useState, useEffect} from "react";
import { Solicitud, User } from "../../../../api";
import { size, map } from "lodash";
import { Loader, Pagination } from "semantic-ui-react";
import { SolicitudItem } from "../SolicitudItem";
import {useAuth } from "../../../../hooks";
import "./ListSolicitud.scss";

const solicitudController = new Solicitud();
const userController = new User();


export function ListSolicitud(props) {
    const { reload, onReload } = props;
    const [solicitudes, setSolicitudes] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState();
    const { accessToken } = useAuth();
    useEffect(() => {
        (async () => {
            try {
                const response = await solicitudController.getSolicitudes({ page, limit: 5 });
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.totalPages,
                    total: response.totalDocs,
                });
                //setSolicitudes(response.docs);
                const solicitudesWithUser = await Promise.all(
                    response.docs.map(async (solicitud) => {
                        const userResponse = await userController.getUser(accessToken, solicitud.solicitante);
                        return {
                            ...solicitud,
                            user: userResponse
                        };
                    })
                );
                setSolicitudes(solicitudesWithUser);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page, reload]);

    const changePage = (_,data) => {
        setPage(data.activePage);
    }

    if(!solicitudes) return <Loader active inline="centered" />
    if(size(solicitudes) === 0) return "No se han encontrado solicitudes";

    return (
        <div className="list-solicitudes">
            {map(solicitudes, (solicitud) => (
                <SolicitudItem key={solicitud._id} solicitud={solicitud} onReload={onReload}/>
            ))}
            <div className="list-solicitudes__pagination"> 
                <Pagination
                    totalPages={pagination.pages} 
                    defaultActivePage={pagination.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={changePage}
                    />
            </div>
        </div>
    );
}