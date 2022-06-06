

import { Link  } from 'react-router-dom';
import { AuthorizationStatus,AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getEmail } from '../../services/email';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import Logo from '../logo/logo';


function Header(): JSX.Element {
  let header: JSX.Element;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentEmail = getEmail();

  const dispatch = useAppDispatch();

  if(authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown){
    header = (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to="/login" title='login' className='header__nav-link header__nav-link--profile'>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>);
  } else {
    header = (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{currentEmail}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    to={AppRoute.Main}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    header
  );
}

export default Header;
