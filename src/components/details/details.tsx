import { FilmInfo } from '../../types/films';

type DetailsProps = {
  idTab: number;
  isActive: number;
  film: FilmInfo;
}

function Details({ idTab, isActive, film }: DetailsProps): JSX.Element {
  const { relased, genre, runTime } = film;
  return (
    <div className={`film-card__text film-card__row ${(isActive !== idTab) ? 'visually-hidden' : ''}`}>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">Wes Anderson</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            Bill Murray, <br />
            Edward Norton, <br />
            Jude Law, <br />
            Willem Dafoe, <br />
            Saoirse Ronan, <br />
            Tony Revoloru, <br />
            Tilda Swinton, <br />
            Tom Wilkinson, <br />
            Owen Wilkinson, <br />
            Adrien Brody, <br />
            Ralph Fiennes, <br />
            Jeff Goldblum
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{runTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{relased}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
