import React, {useState} from "react";
import "./CardDetailsModal.scss";
import {Comment} from "./Comment/Comment";

export const CardDetailsModal = ({cardDetailsModal, hideCardDetailsModal, card, changeTitle, modalName, comments, setComments}) => {

    const [commentText, setCommentText] = useState('');

    const createComment = (commentText, modalName) => {
        setComments([{
            id: new Date(),
            modalName,
            commentText
        },
            ...comments
        ])
    };

    const onSubmit = () => {
        createComment(commentText, modalName)
        setCommentText('')
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
                    <div className="card-details-modal__content">
                        <h2 className="card-details-modal__title">{card.title}</h2>
                        <p className="card-details-modal__text">{card.text}</p>
                    </div>
                    <div className="card-details-modal__comment">
                        <input  type="text" className="card-details-modal__input" value={commentText} onChange={e => setCommentText(e.target.value)}/>
                        <button className="card-details-modal__btn" onClick={onSubmit}>Add Comment</button>
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

