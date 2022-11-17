import React from "react";
import "./Card.scss";

export const Card = ({card}) => {
    return (
        <div className="card">
            <div className="card__title">{card.title}</div>
            <div className="card__task">{card.text}</div>
        </div>
    )
}