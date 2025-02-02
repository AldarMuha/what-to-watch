import { useNavigate } from 'react-router-dom';
import { FilmInfo } from '../../types/films';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AuthorizationStatus } from '../../const';
import ButtonMyList from '../button-my-list/button-my-list';

function Promo({ id, posterImage, name, genre, released, isFavorite }: FilmInfo): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const Navigate = useNavigate();
  const handlePlayerClick = () => {
    Navigate(`${AppRoute.Player}/${id}`);
  };
  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img
            src={posterImage}
            alt={name}
            width={218}
            height={327}
          />
        </div>
        <div className="film-card__desc">
          <h2 className="film-card__title">{name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{genre}</span>
            <span className="film-card__year">{released}</span>
          </p>
          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={handlePlayerClick}>
              <svg viewBox="0 0 19 19" width={19} height={19}>
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            {authorizationStatus === AuthorizationStatus.Auth ? <ButtonMyList id={id} isActive={isFavorite} /> : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;

