import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function EditAvatarPopup(props) {  
    const urlAvatar = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(urlAvatar.current.value)
    }
    return(
        <PopupWithForm name='avatar' title='Обновить аватар' buttonText='Обновить' handleSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
            <input className="popup__input popup__input_content_avatar" ref={urlAvatar} id="avatar-input" placeholder="Ссылка на картинку" type="url" name="avatarUrl" required />
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}