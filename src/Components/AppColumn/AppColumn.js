import React, {useState} from "react";
import "./AppColumn.scss";
import {Card} from "./Card/Card";
import {CardModal} from "../CardModal/CardModal";

export const AppColumn = ({cards, column, title, createCard, removeCard, id, modalName, updateCard, updateUserName, comments, setComments}) => {

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

    const onKeyDown = (e) => {
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
                        modalName={modalName}
                        updateCard={updateCard}
                        comments={comments}
                        setComments={setComments}
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