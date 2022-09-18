function PopupWithForm(props) {
    return(
    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__container">
        <form className="popup__form" name={props.name} onSubmit={props.handleSubmit || props.onSubmitAvatar || props.handleCardSubmit}>
          <h2 className="popup__title">{props.title}</h2>
            {props.children}
          <button className="popup__save" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
    )
}
export default PopupWithForm