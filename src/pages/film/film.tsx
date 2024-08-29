import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import Tabs from '../../components/tabs/tabs';
import Card from '../../components/card/card';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import { fetchFilm, fetchComments, fetchSimilarFilms } from '../../store/action';
//import { NewComment } from '../../types/types';

function Film(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const films = useAppSelector((state) => state.similarFilms);
  const isFilmLoading = useAppSelector((state) => state.isFilmLoading);
  const film = useAppSelector((state) => state.film);
  const reviews = useAppSelector((state) => state.comments);
  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = Number(id);
      dispatch(fetchFilm(parsedId));
      dispatch(fetchComments(parsedId));
      dispatch(fetchSimilarFilms(parsedId));
    }
  }, [params, dispatch]);
  if (!film) {
    return null;
  }
  if (isFilmLoading) {
    return <Spinner />;
  }
  const { id } = film;
  /*
  const onFormSubmit = (FormData: Omit<NewComment, 'id'>) => {
    dispatch(postReview({ id, ...FormData }));
  };
  */
  //const { name, genre, relased } = film;
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src="img/bg-the-grand-budapest-hotel.jpg"
              alt="The Grand Budapest Hotel"
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
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
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.relased}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                <Link className={`btn film-card__button${(authorizationStatus !== AuthorizationStatus.Auth) ? ' visually-hidden' : ''}`} to={`${AppRoute.Comments}/${id}`}>Add review</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width={218}
                height={327}
              />
            </div>
            <Tabs film={film} reviews={reviews} authorizationStatus={authorizationStatus} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {films.map((filmItem) => (<Card key={filmItem.id} {...filmItem} />))}
          </div>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Film;
