import React, {useState} from "react";
import "./Comment.scss";

export const Comment = ({comment, modalName}) => {
    return (
        <div className="comment">
            <div className="comment__line"></div>
            <div className="comment__content">
                <p className="comment__name">{modalName}</p>
                <div className="comment__text">{comment.commentText}</div>
            </div>
        </div>
    )
}