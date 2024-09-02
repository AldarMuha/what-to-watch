import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AuthorizationStatus, AppRoute } from '../../const';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
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
        <Link className="user-block__link" to={AppRoute.Login}>
          <span>{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</span>
        </Link>
      </li>
    </ul>
  );
}

export default UserBlock;
