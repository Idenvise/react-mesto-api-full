import { Route, Switch, Link } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg'
function Header(props) {
    return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />
      <Switch>
        <Route path='/sign-in'>
          <Link className="header__auth-link" to='/sign-up'>Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link className="header__auth-link" to='/sign-in'>Войти</Link>
        </Route>
        <Route path='/'>
          <div className="header__auth">
            <p className='header__user-email'>{props.email}</p>
            <Link className="header__auth-link" onClick={props.onSignOut} to='/sign-in'>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
    )
}
export default Header