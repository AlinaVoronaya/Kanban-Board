import React, {useState} from "react";
import "./Comment.scss";
import {CommentType} from "../../../types";

type CommentProps = {
    comment: CommentType
}

export const Comment = ({comment}: CommentProps) => {

    const [changeComment, setChangeComment] = useState(comment);

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