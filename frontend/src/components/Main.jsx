import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Card from './Card.jsx';

function Main(props) {
  const user = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="Аватар" src={user && user.avatar} />
        </div>
        <div className="profile__info">
          <div className="profile__name-and-button">
            <h1 className="profile__name">{user && user.name}</h1>
            <button className="profile__button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subname">{user && user.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Галерея">
        {props.cards && props.cards.map(card => {
          return(<Card card={card} key={card._id} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} onCardLike={props.onCardLike} />)})
        }
      </section>
    </main>
  )
}
export default Main