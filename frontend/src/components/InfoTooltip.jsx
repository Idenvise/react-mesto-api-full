import React from "react";
import registerAccept from "../images/popup__info-tooltip_succes.svg"
import registerRefuse from "../images/popup__info-tooltip_refuse.svg"

export default function InfoTooltip(props) {
    return(
        <section className={`popup popup__info-tooltip ${props.isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__container">
                <div className="popup__info-tooltip__content">
                    <img className="popup__info-tooltip_image" src={props.regResult ? registerAccept : registerRefuse} />
                    <h2 className="popup__info-tooltip_result">{props.regResult ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                </div>
                <button className="popup__close" type="button" onClick={props.onClose}></button>
            </div>
        </section>
    )
}