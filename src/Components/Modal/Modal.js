import React from "react";
import "./Modal.scss";

export const Modal = ({modal, setModal, setModalName}) => {
    return (
        <div className={modal ? "modal active" : "modal"} onClick={() => setModal(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1 className="modal__title">What is your name?</h1>
                <input type="text" className="modal__input" required onChange={e => setModalName(e.target.value)}/>
                <button className="modal__btn" onClick={() => setModal(false)}>Save</button>
            </div>
        </div>
    )
}

