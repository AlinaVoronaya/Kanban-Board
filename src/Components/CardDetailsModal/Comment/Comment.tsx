import React from "react";
import "./Comment.scss";

export const Comment = ({comment}) => {
    return (
        <div className="comment">
            <div className="comment__line"></div>
            <div className="comment__content">
                <p className="comment__name">{comment.username}</p>
                <div className="comment__text">{comment.text}</div>
            </div>
        </div>
    )
}