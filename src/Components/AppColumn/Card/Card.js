import React, {useState} from "react";
import "./Card.scss";
import {CardDetailsModal} from "../../CardDetailsModal/CardDetailsModal";

export const Card = ({card, removeCard, changeTitle, modalName, updateCard, comments, setComments}) => {

    const [cardDetailsModal, setCardDetailsModal] = useState(false);

    const showCardDetailsModal = () => {
        setCardDetailsModal(true)
    }

    const hideCardDetailsModal = () => {
        setCardDetailsModal(false)
    }

    let cardTitle = card.title;

    return (
        <div className="card">
            <div className="card__content" onClick={() => showCardDetailsModal()}>
                <h2 className="card__title">{cardTitle}</h2>
                <div className="card__task">{card.text}</div>
            </div>
            <div className="card__icons">
                <button className="card__remove" onClick={() => removeCard(card.id)}>×</button>
                <div className="card__comments">{comments.length}</div>
            </div>
            <CardDetailsModal
                cardDetailsModal={cardDetailsModal}
                hideCardDetailsModal={hideCardDetailsModal}
                card={card}
                changeTitle={changeTitle}
                modalName={modalName}
                comments={comments}
                setComments={setComments}
                updateCard={updateCard}
            />
        </div>
    )
}