import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === user._id;
  const isLiked = props.card.likes.some(i => i === user._id)
  function handleClick() {
    props.onCardClick(props.card);
  }
  function likeClick() {
    props.onCardLike(props.card, isLiked)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
    return(
        <article className="element">
          <div className={`element__trash  ${!isOwn  && 'element__trash_invisible'}`} onClick={handleDeleteClick}></div>
          <img className="element__img" src={props.card.link} alt={`Изображение места под названием ${props.card.name}`} onClick={handleClick}/>
          <div className="element__image-info">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__card-info">
              <button className={`element__like ${isLiked && 'element__like_active'}`} type="button" onClick={likeClick}></button>
              <h3 className="element__like-counter">{props.card.likes.length}</h3>
            </div>
          </div>
        </article>
    )
}
export default Card