import PopupWithForm from "./PopupWithForm";
import React from "react";


export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('')

    function handleName(e) {
        setName(e.target.value)
    }
    function handleUrl(e) {
        setUrl(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name, link: url})
    }
    return(
        <PopupWithForm name={props.name} title={props.title} handleSubmit={handleSubmit} buttonText={props.buttonText} isOpen={props.isOpen} onClose={props.onClose}>
            <input className="popup__input popup__input_content_place" onChange={handleName} value={name} id="place-input" placeholder="Название" type="text" name="name" minLength="2" maxLength="30" required />
            <span className="popup__input-error place-input-error"></span>
            <input className="popup__input popup__input_content_link" onChange={handleUrl} value={url} id="url-input" placeholder="Ссылка на картинку" type="url" name="link" required />
            <span className="popup__input-error url-input-error"></span>  
        </PopupWithForm>
    )
}