import React from "react";

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  function onLogin(e) {
    e.preventDefault();
    props.onSubmit(email, password)
  }
    return(
        <form className="auth auth__login-form" name="login-form">
          <h2 className="auth__title">Вход</h2>
          <input className="auth__input" onChange={handleEmail} placeholder="Email" type="email" name="login" minLength="2" maxLength="30" autoComplete="on" required />
          <input className="auth__input" onChange={handlePassword} placeholder="Пароль" type="password" nampe="password" minLength="5" maxLength="30" autoComplete="on" required />
          <div className="auth__submit-container">
            <button className="auth__submit" onClick={onLogin} type="submit">Войти</button>
          </div>
        </form>
    )
}