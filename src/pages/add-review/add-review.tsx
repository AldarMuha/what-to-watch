import Form from '../../components/form/form';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getFilm } from '../../store/site-data/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';

function AddReview(): JSX.Element {
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  if (!film) {
    navigate(AppRoute.Login);
  }
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">
                  {film?.name}
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img
            src="img/the-grand-budapest-hotel-poster.jpg"
            alt="The Grand Budapest Hotel poster"
            width={218}
            height={327}
          />
        </div>
      </div>
      <div className="add-review">
        {(!film) ? '' : <Form id={film.id} />}
      </div>
    </section>
  );
}

export default AddReview;
