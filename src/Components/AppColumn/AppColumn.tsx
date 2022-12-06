import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import "./AppColumn.scss";
import {Card} from "./Card/Card";
import {CardModal} from "../CardModal/CardModal";
import {CardType} from "../../types";
import {ColumnType} from "../../types";

type AppColumnProps = {
    cards: Array<CardType>,
    column: ColumnType,
    title: string,
    createCard: (title: string, text: string, columnId: number) => void,
    removeCard: (id: number) => void,
    id: number,
    username: string,
    updateCard: (id: number, title: string, text: string) => void,
    updateUserName: (id: number, title: string) => void,
    addCommentToCard: (id: number, text: string) => void
}

export const AppColumn = ({cards, column, title, createCard, removeCard, id, username, updateCard, updateUserName, addCommentToCard}: AppColumnProps) => {

    const [changeTitle, setChangeTitle] = useState(title);
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [cardModal, setCardModal] = useState(false);

    const showCardModal = () => {
        setCardModal(true)
    }

    const hideCardModal = () => {
        setCardModal(false)
    }

    let columnTitle;

    const onKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateUserName(column.id, changeTitle);
            setIsEditTitle(false);
        }
    }

    if (isEditTitle) {
        columnTitle = <input
            autoFocus
            value={changeTitle}
            onChange={e => setChangeTitle(e.target.value)}
            onBlur={() => setIsEditTitle(false)}
            onKeyDown={onKeyDown}
            className="column__input"/>
    } else {
        columnTitle = <div onClick={() => setIsEditTitle(true)}>{changeTitle}</div>
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
                        changeTitle={changeTitle}
                        username={username}
                        updateCard={updateCard}
                        addCommentToCard={addCommentToCard}
                    />
                ))}
            </div>
            <button className="column__add-card" onClick={() => showCardModal()}>+ Add Card</button>
            <CardModal
                cardModal={cardModal}
                hideModal={hideCardModal}
                createCard={createCard}
                columnId={id}
            />
        </div>
    )
}