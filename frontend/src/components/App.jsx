import React, {useEffect} from 'react';
import { Redirect, Route, Switch, withRouter, useHistory } from 'react-router-dom';
import {api} from '../utils/Api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import PopupDelete from './PopupDelete';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import { register } from '../utils/Auth.js';
import { login } from '../utils/Auth.js';
import { tokenCheck } from '../utils/Auth.js';

function App() {
  const [currentUser, setUser] = React.useState({});
  const [currentCards, setCards] = React.useState([]);
  const [loggedIn, setLoginState] = React.useState(false);
  const [regResult, setRegResult] = React.useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      requestTokenValid(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    loggedIn &&  getCards();
  }, [loggedIn])

  function requestTokenValid(token) {
    tokenCheck(token).then(res => {if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }}).then((user) => {setLoginState(true); setUser(user)}).then(() => hist.push('/')).catch(err => console.log(err))
  }

  function getCards() {
  localStorage.getItem('token') !== null && api.getInitialCards()
    .then(cards => setCards(cards))
    .catch(err => console.log(err))
  }

  function handleCardLike(card, isLiked) {
    const promise = isLiked ? api.unsetLike(card._id) : api.setLike(card._id)
    promise.then(newCard => setCards(currentCards => currentCards.map(c => c._id === card._id ? newCard : c))).catch(err => console.log(err))
  }


  function handleCardDelete(card) {
    card.owner === currentUser._id && api.deleteCard(card._id).then(() => setCards(currentCard => currentCard.filter(c => !(c._id === card._id))))
  }
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true)
    }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true)
    }
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true)
    }
  const [isPopupImageOpen, setIsPopupImageOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
    function handleCardClick(card) {
      setSelectedCard(card)
      setIsPopupImageOpen(true)
    }
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
 
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupImageOpen(false);
    setIsTooltipPopupOpen(false)
    setSelectedCard({});
  }
  
  function handleUpdateUser({name, about}) {
    api.changeProfileData(name, about).then(res => setUser(res)).then(()=>closeAllPopups()).catch(err => console.log(err))
  }
  function handleUpdateAvatar(url) {
    api.changeAvatar(url, currentUser._id).then(res => setUser(res)).then(()=>closeAllPopups()).catch(err => console.log(err))
  }
  function handleAddPlace(obj) {
    api.createCard(obj).then(card => {setCards([card, ...currentCards])}).then(()=>closeAllPopups()).catch(err => console.log(err))
}
  function submitRegister(email, password) {
    register(email, password).then(res => {if (res.ok) {
      setRegResult(true);
      return res.json()}
      else {
      setRegResult(false)
      return Promise.reject(`Ошибка ${res.status}`);
      }}).catch(err => console.log(err)).finally(() => setIsTooltipPopupOpen(true))
  }
  
  const hist = useHistory();
  function submitLogin(email, password) {
    login(email, password).then(res => {if (res.ok) {
      return res.json()}
      else {
        return Promise.reject(`Ошибка ${res.status}`);
      }}).then((res) => {localStorage.setItem('token', res.token); setLoginState(true); setUser(res.user)}).then(() => hist.push('/')).catch(err => console.log(err))
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoginState(false);
  }

return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={currentUser.email} onSignOut={signOut}/>
      <Switch>
        <Route exact path='/'>
          <ProtectedRoute component={Main} loggedIn={loggedIn} redirectPath='/sign-in' cards={currentCards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile = {handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        </Route>
        <Route path='/sign-in'>
          <Login onSubmit={submitLogin} />
        </Route>
        <Route path='/sign-up'>
          <Register onSubmit={submitRegister}/>
        </Route>
        <Route path='*'>
          {loggedIn ? <Redirect to='/'/> : <Redirect to='/sign-in'/>}
        </Route>
      </Switch>
      <Footer />
      <InfoTooltip onClose={closeAllPopups} isOpen={isTooltipPopupOpen} regResult={regResult} />
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup onAddPlace={handleAddPlace} name='add' title='Новое место' buttonText='Создать'isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} /> 
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isPopupImageOpen} />
      <PopupDelete />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
