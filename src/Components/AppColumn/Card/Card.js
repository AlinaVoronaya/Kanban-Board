import React, {useState} from "react";
import "./Card.scss";
import {CardDetailsModal} from "../../CardDetailsModal/CardDetailsModal";

export const Card = ({card, removeCard}) => {

    const [cardDetailsModal, setCardDetailsModal] = useState(false);

    const showCardDetailsModal = () => {
        setCardDetailsModal(true)
    }

    const hideCardDetailsModal = () => {
        setCardDetailsModal(false)
    }

    return (
        <div className="card">
            <div className="card__content" onClick={() => showCardDetailsModal()}>
                <h2 className="card__title">{card.title}</h2>
                <div className="card__task">{card.text}</div>
            </div>
            <div className="card__icons">
                <button className="card__remove" onClick={() => removeCard(card.id)}>×</button>
            </div>
            <CardDetailsModal
                cardDetailsModal={cardDetailsModal}
                hideCardDetailsModal={hideCardDetailsModal}
                card={card}
            />
        </div>
    )
}