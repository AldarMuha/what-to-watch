import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userStatusLoading = useAppSelector((state) => state.isUserStatusLoading);
  if (userStatusLoading) {
    return <Spinner />;
  }
  return (
    (authorizationStatus === AuthorizationStatus.Auth)
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
