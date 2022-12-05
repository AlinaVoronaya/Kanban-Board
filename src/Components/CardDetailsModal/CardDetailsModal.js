import React, {useState} from "react";
import "./CardDetailsModal.scss";
import {Comment} from "./Comment/Comment";

export const CardDetailsModal = ({cardDetailsModal, hideCardDetailsModal, card, changeTitle, modalName, comments, setComments, updateCard}) => {

    const [commentText, setCommentText] = useState('');
    const [cardTitle, setCardTitle] = useState(card.title);
    const [cardText, setCardText] = useState(card.text);

    const createComment = (commentText, modalName) => {
        setComments([{
            id: new Date(),
            modalName,
            commentText
        },
            ...comments
        ])
    };

    const onCommentSubmit = () => {
        createComment(commentText, modalName)
        setCommentText('')
    }

    const onCardSubmit = (e) => {
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
                        <p>автор: {modalName}</p>
                    </div>
                    <form className="card-details-modal__content" onSubmit={onCardSubmit}>
                        <input type="text" name="title" className="card-details-modal__title" required value={cardTitle} onChange={e => setCardTitle(e.target.value)}/>
                        <textarea rows="3" name="text" className="card-details-modal__text" required value={cardText} onChange={e => setCardText(e.target.value)}/>
                        <button type="submit" className="card-details-modal__btn card-details-modal__content__btn">Save</button>
                    </form>
                    <div className="card-details-modal__comment">
                        <input  type="text" className="card-details-modal__input" value={commentText} onChange={e => setCommentText(e.target.value)}/>
                        <button className="card-details-modal__btn" onClick={onCommentSubmit}>Add Comment</button>
                        {comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                commentText={commentText}
                                modalName={modalName}
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

