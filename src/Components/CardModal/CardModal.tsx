import React, {useState} from "react";
import "./CardModal.scss";

export const CardModal = ({cardModal, hideModal, createCard, columnId}) => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const onSubmit = () => {
        createCard(title, text, columnId)
        setText('')
        setTitle('')
        hideModal()
    }

    return (
        <div className={cardModal ? "card-modal active" : "card-modal"} onClick={() => hideModal()}>
            <div className="card-modal__content" onClick={e => e.stopPropagation()}>
                    <h2 className="card-modal__title">Enter Title:</h2>
                    <input type="text" className="card-modal__input" autoFocus value={title} onChange={e => setTitle(e.target.value)}/>
                    <h2 className="card-modal__title">Enter Task:</h2>
                    <input type="text" className="card-modal__input" value={text} onChange={e => setText(e.target.value)}/>
                    <button className="card-modal__btn" onClick={onSubmit}>Save</button>
            </div>
        </div>
    )
}

