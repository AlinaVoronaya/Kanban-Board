import React from "react";
import "./AppColumn.scss";
import {Card} from "./Card/Card";

export const AppColumn = ({cards, title, setModal}) => {

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
            <button className="column__add-card" onClick={() => setModal(true)}>+ Add Card</button>
        </div>
    )
}