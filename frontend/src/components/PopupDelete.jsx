function PopupDelete() {
    return(
    <section className="popup popup-delete">
      <div className="popup__container">
        <div className="popup__accept-request">
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__delete">Да</button>
        </div>
        <button className="popup__close" type="button"></button>
      </div>
    </section>
    )
}
export default PopupDelete