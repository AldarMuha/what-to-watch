import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AuthorizationStatus, AppRoute } from '../../const';
import { logoutUser } from '../../store/action';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
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
          <Link className="user-block__link" to={AppRoute.Login} onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutUser());
          }}
          >
            <span>Sign out</span>
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.Login}>
            <span>Sign in</span>
          </Link>
        </li>
      </ul>
    );
  }

}

export default UserBlock;
