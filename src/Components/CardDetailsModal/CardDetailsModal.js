import React, {useState} from "react";
import "./CardDetailsModal.scss";

export const CardDetailsModal = ({cardDetailsModal, hideCardDetailsModal, card}) => {

    // const [title, setTitle] = useState('');
    // const [text, setText] = useState('');

    // const onKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //         addCard(title, text, columnId)
    //         // setText('')
    //     }
    // }

    // const onTitleButton = () => {
    //     addCard(title, text, columnId)
    //     // setText('')
    // }
    //
    // const onTextButton = () => {
    //     addCard(title, text, columnId)
    //     // setText('')
    // }

    return (
        <div className={cardDetailsModal ? "card-details-modal active" : "card-details-modal"} onClick={() => hideCardDetailsModal()}>
            <div className="card-details-modal__content" onClick={e => e.stopPropagation()}>
                    <h2 className="card-details-modal__title">{card.title}</h2>
                    <p className="card-details-modal__text">{card.text}</p>
                <button className="card-details-modal__btn">Add Comment</button>
            </div>
        </div>
    )
}

