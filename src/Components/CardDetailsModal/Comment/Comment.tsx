import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import "./Comment.scss";
import {CommentType} from "../../../types";

type CommentProps = {
    comment: CommentType,
    updateComment: (cardId: number, commentId: number, text: string) => void,
    cardId: number,
    removeComment: (cardId: number, commentId: number) => void
}

export const Comment = ({comment, updateComment, cardId, removeComment}: CommentProps) => {

    const [changeComment, setChangeComment] = useState(comment.text);
    const [isEditComment, setIsEditComment] = useState(false);

    const onKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateComment(cardId, comment.id, changeComment);
            setIsEditComment(false);
        }
    }

    let newComment;

    if (isEditComment) {
        newComment = <input
            autoFocus
            value={changeComment}
            onChange={e => setChangeComment(e.target.value)}
            onBlur={() => setIsEditComment(false)}
            onKeyDown={onKeyDown}
            className="column__input"/>
    } else {
        newComment = <div onClick={() => setIsEditComment(true)}>{changeComment}</div>
    }

    return (
        <div className="comment">
            <div className="comment__wrapper">
                <div className="comment__line"></div>
                <div className="comment__content">
                    <p className="comment__name">{comment.username}</p>
                    <div className="comment__text">{newComment}</div>
                </div>
            </div>
            <div className="comment__icons" onClick={() => removeComment(cardId, comment.id)}>╳</div>
        </div>
    )
}