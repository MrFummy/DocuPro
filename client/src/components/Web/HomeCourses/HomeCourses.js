import React, {useState, useEffect} from "react";
import "./HomeCourses.scss";
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {Solicitud} from "../../../api";
import { map } from "lodash";
import { ENV } from "../../../utils";

const solicitudController = new Solicitud();


export function HomeCourses() {
    const [solicitudes, setSolicitudes] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await solicitudController.getSolicitudes({ limit: 6});
                setSolicitudes(response.docs);
            } catch (error) {
                console.error(error);
            }
        })()
    },[])
    return (
        <Container className="home-courses">
            <h2>Ultimas solicitudes</h2>
            <div className="home-courses__all-courses">
                {map(solicitudes, (sol) => (
                    <a key={sol.id} href="#" target="_blank">
                        <div>
                            <span>{sol.titulo} - </span>
                            <span>{sol.descripcion}</span>
                        </div>
                        
                    </a>
                ))}
            </div>
        </Container>
        
    )
}