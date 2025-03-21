import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import Player from '../../pages/player/player';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Films}/:id`} element={<Film />} />
        <Route path={`${AppRoute.Comments}/:id`} element={<AddReview />} />
        <Route path={`${AppRoute.Player}/:id`} element={<Player />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
