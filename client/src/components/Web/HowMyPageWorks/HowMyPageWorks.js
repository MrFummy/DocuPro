import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { itemsData } from "./HowMyPageWorks.data"
import "./HowMyPageWorks.scss"

export function HowMyPageWorks() {
    return (
        <Container className="how-my-page-works">
            <h2>¿Como funciona esta pagina?</h2>
            <h4>Esta pagina dispone de varios modulos con funcionalidades distintas</h4>
            <div className="how-my-page-works__items">
                {map(itemsData, (item, index) => (
                    <div key={index}>
                        <div>
                            <Icon name={item.icon} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
            
    )
}