import { Fragment } from 'react';
import { FilmInfo } from '../../types/films';

type OverviewProps = {
  idTab: number;
  isActive: number;
  film: FilmInfo;
}

function Overview({ idTab, isActive, film }: OverviewProps): JSX.Element {
  const { rating, description, scoresCount, director, starring } = film;
  return (
    <Fragment>
      <div className={`film-rating ${(isActive !== idTab) ? 'visually-hidden' : ''}`}>
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className={`film-card__text ${(isActive !== idTab) ? 'visually-hidden' : ''}`}>
        {description}
        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>
            Starring: {starring.join(',')}
          </strong>
        </p>
      </div>
    </Fragment>
  );
}

export default Overview;
