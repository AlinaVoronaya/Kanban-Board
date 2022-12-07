import React, {useState} from "react";
import "./CardDetailsModal.scss";
import {Comment} from "./Comment/Comment";
import {CardType} from "../../types";

type CardDetailsModalProps = {
    cardDetailsModal: boolean,
    hideCardDetailsModal: () => void,
    card: CardType,
    changeTitle: string,
    username: string,
    updateCard: (id: number, title: string, text: string) => void,
    addCommentToCard: (id: number, text: string) => void
}

export const CardDetailsModal = ({cardDetailsModal, hideCardDetailsModal, card, changeTitle, username, updateCard, addCommentToCard}: CardDetailsModalProps) => {

    const [commentText, setCommentText] = useState('');
    const [cardTitle, setCardTitle] = useState(card.title);
    const [cardText, setCardText] = useState(card.text);

    const onCommentSubmit = () => {
        addCommentToCard( card.id, commentText)
        setCommentText('')
    }

    const onCardSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateCard(card.id, cardTitle, cardText);
    }


    return (
        <div className={cardDetailsModal ? "card-details-modal active" : "card-details-modal"}
             onClick={() => hideCardDetailsModal()}>
            <div className="card-details-modal__wrapper" onClick={e => e.stopPropagation()}>
                <div className="card-details-modal__main">
                    <div className="card-details-modal__header">
                        <p>в колонке: {changeTitle}</p>
                        <p>автор: {username}</p>
                    </div>
                    <form className="card-details-modal__content" onSubmit={onCardSubmit}>
                        <input type="text" name="title" className="card-details-modal__title" required value={cardTitle} onChange={e => setCardTitle(e.target.value)}/>
                        <textarea rows={3} name="text" className="card-details-modal__text" required value={cardText} onChange={e => setCardText(e.target.value)}/>
                        <button type="submit" className="card-details-modal__btn card-details-modal__content__btn">Save</button>
                    </form>
                    <div className="card-details-modal__comment">
                        <input  type="text" className="card-details-modal__input" value={commentText} onChange={e => setCommentText(e.target.value)}/>
                        <button className="card-details-modal__btn" onClick={onCommentSubmit}>Add Comment</button>
                        {card.comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </div>
                </div>
                <div className="card-details-modal__icons">
                    <button className="card__remove" onClick={() => hideCardDetailsModal()}>╳</button>
                </div>
            </div>
        </div>
    )
}

