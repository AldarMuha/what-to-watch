import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import Player from '../../pages/player/player';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

import { FilmInfo } from '../../types/films';

type AppProps = {
  films: FilmInfo[];
}

function App({ films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main films={films} />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList films={films} />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Films}/:id`} element={<Film films={films} />} />
        <Route path={`${AppRoute.Films}/:id/review`} element={<AddReview films={films} />} />
        <Route path={`${AppRoute.Player}/:id`} element={<Player />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
