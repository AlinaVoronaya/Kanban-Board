import React from "react";
import "./AppColumn.scss";
import {Card} from "./Card/Card";

export const AppColumn = ({cards, title}) => {

    const renderHeaderInput = () => {

    }

    return (
        <div className="column">
            <header className="column__header">
                {title}
            </header>
            <div className="column__cards">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                    />
                ))}
            </div>
            <button className="column__add-card">+ Add Card</button>
        </div>
    )
}