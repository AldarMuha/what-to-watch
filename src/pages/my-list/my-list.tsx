import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import { getIsFilmLoading, getSimilarFilms } from '../../store/site-data/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';

function MyList(): JSX.Element {
  const films = useAppSelector(getSimilarFilms);
  const isFilmsLoading = useAppSelector(getIsFilmLoading);
  if (isFilmsLoading) {
    return <Spinner />;
  }
  return (
    <div className="user-page">
      <header className="age-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {films.map((film) => (
          <Card key={film.id} {...film} />
        ))}
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
  );
}

export default MyList;
