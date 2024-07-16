import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

import { FilmInfo } from '../../types/films';
import VideoPlayer from '../video-player/video-player';

type CardProps = FilmInfo & {
  activeCard: number | null;
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
}

function Card({ id, name, previewImage, previewVideoLink, posterImage, activeCard, onMouseMove, onMouseLeave }: CardProps): JSX.Element {
  const handleMouseMove = () => {
    onMouseMove(id);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseMove={handleMouseMove} onMouseLeave={onMouseLeave}>
      {(activeCard) ? (<VideoPlayer {...{ previewVideoLink, posterImage }} />)
        : (<>
          <div className="small-film-card__image">
            <img
              src={previewImage}
              alt={name}
              width={280}
              height={175}
            />
          </div>
          <h3 className="small-film-card__title">
            <Link className="small-film-card__link" to={`${AppRoute.Films}/:${id}`}>
              {name}
            </Link>
          </h3>
        </>
        )}
    </article>
  );
}

export default Card;
