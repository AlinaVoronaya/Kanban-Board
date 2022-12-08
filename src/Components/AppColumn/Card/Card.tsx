import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import "./Card.scss";
import {CardDetailsModal} from "../../CardDetailsModal/CardDetailsModal";
import {CardType} from "../../../types";

type CardProps = {
    card: CardType,
    removeCard: (id: number) => void,
    changeTitle: string,
    username: string,
    updateCard: (id: number, title: string, text: string) => void,
    addCommentToCard: (id: number, text: string) => void,
    updateComment: (cardId: number, commentId: number, text: string) => void,
    removeComment: (cardId: number, commentId: number) => void
}

export const Card = ({card, removeCard, changeTitle, username, updateCard, addCommentToCard, updateComment, removeComment}: CardProps) => {

    const [cardDetailsModal, setCardDetailsModal] = useState(false);

    const showCardDetailsModal = () => {
        setCardDetailsModal(true)
    }

    const hideCardDetailsModal = () => {
        setCardDetailsModal(false)
    }

    const onKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === "Escape") {
            hideCardDetailsModal();
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", onKeyDown, false);
        return () => {
            document.removeEventListener("keydown", onKeyDown, false);
        }
    }, []);

    let cardTitle = card.title;

    return (
        <div className="card">
            <div className="card__content" onClick={() => showCardDetailsModal()}>
                <h2 className="card__title">{cardTitle}</h2>
                <div className="card__task">{card.text}</div>
            </div>
            <div className="card__icons">
                <button className="card__remove" onClick={() => removeCard(card.id)}>×</button>
                <div className="card__comments">{card.comments.length}</div>
            </div>
            <CardDetailsModal
                cardDetailsModal={cardDetailsModal}
                hideCardDetailsModal={hideCardDetailsModal}
                card={card}
                changeTitle={changeTitle}
                username={username}
                addCommentToCard={addCommentToCard}
                updateCard={updateCard}
                updateComment={updateComment}
                removeComment={removeComment}
            />
        </div>
    )
}