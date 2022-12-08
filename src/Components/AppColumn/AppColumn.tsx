import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import "./AppColumn.scss";
import {Card} from "../Card/Card";
import {CardModal} from "../CardModal/CardModal";
import {CardType} from "../../types";
import {ColumnType} from "../../types";

type AppColumnProps = {
    cards: Array<CardType>,
    column: ColumnType,
    createCard: (title: string, text: string, columnId: number) => void,
    removeCard: (id: number) => void,
    username: string,
    updateCard: (id: number, title: string, text: string) => void,
    updateColumnTitle: (id: number, title: string) => void,
    addCommentToCard: (id: number, text: string) => void,
    updateComment: (cardId: number, commentId: number, text: string) => void,
    removeComment: (cardId: number, commentId: number) => void
}

export const AppColumn = ({cards, column, createCard, removeCard, username, updateCard, updateColumnTitle, addCommentToCard, updateComment, removeComment}: AppColumnProps) => {

    const [title, setTitle] = useState(column.title);
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [cardModal, setCardModal] = useState(false);

    const showCardModal = () => {
        setCardModal(true)
    }

    const hideCardModal = () => {
        setCardModal(false)
    }

    const onKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateColumnTitle(column.id, title);
            setIsEditTitle(false);
        }
    }

    let columnTitle = <div onClick={() => setIsEditTitle(true)}>{title}</div>;

    if (isEditTitle) {
        columnTitle = <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            // onBlur={() => setIsEditTitle(false)}
            onKeyDown={onKeyDown}
            className="column__input"/>
    }


    return (
        <div className="column">
            <header className="column__header">
                {columnTitle}
            </header>
            <div className="column__cards">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        removeCard={removeCard}
                        columnTitle={title}
                        username={username}
                        updateCard={updateCard}
                        addCommentToCard={addCommentToCard}
                        updateComment={updateComment}
                        removeComment={removeComment}
                    />
                ))}
            </div>
            <button className="column__add-card" onClick={() => showCardModal()}>+ Add Card</button>
            <CardModal
                cardModal={cardModal}
                hideCardModal={hideCardModal}
                createCard={createCard}
                columnId={column.id}
            />
        </div>
    )
}