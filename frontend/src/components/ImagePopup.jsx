function ImagePopup(props) {
    return(
    <section className={`popup popup-zoom ${props.isOpen ? 'popup_visible' : ''}`} aria-label="Увеличение картинки" >
      <div className="popup__container">
        <div className="popup__zoom-img-place">
          <img className="popup__zoom-img" src={props.card.link} alt={`Место под названием ${props.card.name}`} />
          <p className="popup__zoom-place">{props.card.name}</p>
        </div>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
    )
}
export default ImagePopup