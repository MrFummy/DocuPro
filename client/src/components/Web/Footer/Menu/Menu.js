import React from "react";
import "./Menu.scss";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export function Menu() {
    return (
        <div className="footer-menu">
            <h4>Navegacion</h4>
            <Grid columns={2}>
                <Grid.Column>
                    <Link to="#">
                        <Icon name="book" /> Listin
                    </Link>
                    <Link to="#">
                        <Icon name="calendar" /> Agenda
                    </Link>
                    <Link to="#">
                        <Icon name="code" /> Programacion
                    </Link>
                    <Link to="#">
                        <Icon name="database" /> Base de datos
                    </Link>
                    <Link to="#">
                        <Icon name="code" /> UI/UX
                    </Link>
                </Grid.Column>

                <Grid.Column>
                    <Link to="#">
                        <Icon name="server" /> Servidores
                    </Link>
                    <Link to="#">
                        <Icon name="cogs" /> CMS
                    </Link>
                    <Link to="#">
                        <Icon name="user outline" /> Portfolio
                    </Link>
                    <Link to="#">
                        <Icon name="python" /> Backend
                    </Link>
                    <Link to="#">
                        <Icon name="code" /> Frontend
                    </Link>
                </Grid.Column>
            </Grid>
        </div>
    )
}