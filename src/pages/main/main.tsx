import { useAppSelector } from '../../hooks';
import CardList from '../../components/card-list/card-list';
import GenresList from '../../components/genres-list/genres-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { getPromoFilm } from '../../store/site-data/selectors';
import Promo from '../../components/promo/promo';

function Main(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>
        {promoFilm !== null ? <Promo {...promoFilm} /> : ''}
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <CardList />
          <div className="catalog__more">
            <ShowMoreButton />
          </div>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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

export default Main;
