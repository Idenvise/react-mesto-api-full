import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser ? currentUser.name : 'Жак-Ив Кусто');
    const [description, setDescription] = React.useState(currentUser ? currentUser.about : 'Исследователь океана')

    React.useEffect(() => {
      setName(currentUser && currentUser.name);
      setDescription(currentUser && currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeSubname(e) {
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({name, about: description})
    }

    return (
        <PopupWithForm name='profile' title='Редактировать профиль' buttonText='Сохранить' handleSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}> 
            <input className='popup__input popup__input_content_name' id='name-input' onChange={handleChangeName} value={name ? name : ''}  placeholder="Имя" type="text" name='popup' minLength="2" maxLength="40" required />
            <span className='popup__input-error name-input-error'></span>
            <input className='popup__input popup__input_content_subname' id='subname-input' onChange={handleChangeSubname} value={description ? description : ''} placeholder="О себе" type="text" name='subname' minLength="2" maxLength="200" required />
            <span className='popup__input-error subname-input-error'></span>
        </PopupWithForm>
    )
}