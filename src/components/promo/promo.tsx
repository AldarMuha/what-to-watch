import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AuthorizationStatus } from '../../const';
import ButtonMyList from '../button-my-list/button-my-list';
import { getPromoFilm } from '../../store/site-data/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';

function Promo(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const Navigate = useNavigate();
  const handlePlayerClick = () => {
    if (promoFilm !== null) {
      Navigate(`${AppRoute.Player}/${promoFilm.id}`);
    }
  };
  return (
    <section className="film-card">
      <div className="film-card__bg">
        {(promoFilm !== null) ?
          <img
            src={promoFilm.backgroundImage}
            alt={promoFilm.name}
          /> : ''}
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo />
        <UserBlock />
      </header>
      {promoFilm !== null ?
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm.posterImage}
                alt={promoFilm.name}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayerClick}>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth ? <ButtonMyList id={promoFilm.id} isActive={promoFilm.isFavorite} /> : ''}
              </div>
            </div>
          </div>
        </div>
        : ''}
    </section>

  );
}

export default Promo;

