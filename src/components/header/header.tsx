import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

function Header(): JSX.Element {
  const isUserPage = false;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  return (
    <header className={`page-header${isUserPage ? ' user-page__head' : ' film-card__head'}`}>
      <div className="logo">
        <Link className="logo__link" to='/'>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {isUserPage ? <h1 className="page-title user-page__title">My list</h1> : ''}
      <ul className="user-block">
        <li className="user-block__item">
          {authorizationStatus === AuthorizationStatus.Auth ? <span>{user}</span> : ''}
          <div className="user-block__avatar">
            <img
              src="img/avatar.jpg"
              alt="User avatar"
              width={63}
              height={63}
            />
          </div>
        </li>
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.Login}>
            {authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
