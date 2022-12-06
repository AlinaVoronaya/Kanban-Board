import React, {Dispatch, SetStateAction, useState} from "react";
import "./UserNameModal.scss";


type UserNameModalProps = {
    userNameModalVisible: boolean,
    setUserNameModalVisible: Dispatch<SetStateAction<boolean>>,
    setUsername: Dispatch<any>
}

export const UserNameModal = ({userNameModalVisible, setUserNameModalVisible, setUsername}: UserNameModalProps) => {

    const [title, setTitle] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(title);
        setUserNameModalVisible(false);
    }

    return (
        <div className={userNameModalVisible ? "modal active" : "modal"}>
            <form className="modal__content" onClick={e => e.stopPropagation()} onSubmit={onSubmit}>
                <h1 className="modal__title">What is your name?</h1>
                <input type="text" className="modal__input" required onChange={e => setTitle(e.target.value)}/>
                <button type="submit" className="modal__btn">Save</button>
            </form>
        </div>
    )
}

