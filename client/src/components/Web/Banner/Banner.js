import React from "react";
import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
    return (
        <div className="banner">
            <Container>
                <h1>
                    Expertos en comunicación empresarial
                </h1>
                <h2>
                    Somos especialistas en facilitar las soluciones de comunicación que
                    <br />
                    tu empresa necesita.
                </h2>
            </Container>
            <div className="banner__dark" />
        </div>
    );
}