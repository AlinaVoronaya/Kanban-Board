import React, {useState} from "react";
import "./CardModal.scss";

type CardModalProps = {
    visible: boolean,
    hideCardModal: () => void,
    createCard: (title: string, text: string, columnId: number) => void,
    columnId: number
}

export const CardModal = ({visible, hideCardModal, createCard, columnId}: CardModalProps) => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const onSubmit = () => {
        createCard(title, text, columnId)
        setText('')
        setTitle('')
        hideCardModal()
    }

    return (
        <div className={visible ? "card-modal active" : "card-modal"} onClick={() => hideCardModal()}>
            <div className="card-modal__wrapper" onClick={e => e.stopPropagation()}>
                <div className="card-modal__content">
                    <h2 className="card-modal__title">Enter Title:</h2>
                    <input type="text" className="card-modal__input" autoFocus value={title} onChange={e => setTitle(e.target.value)}/>
                    <h2 className="card-modal__title">Enter Task:</h2>
                    <input type="text" className="card-modal__input" value={text} onChange={e => setText(e.target.value)}/>
                    <button className="card-modal__btn" onClick={onSubmit}>Save</button>
                </div>
                <div className="card-modal__icons">
                    <button className="card__remove" onClick={() => hideCardModal()}>╳</button>
                </div>
            </div>
        </div>
    )
}

