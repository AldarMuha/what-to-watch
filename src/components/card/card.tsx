import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

import type { FilmInfo } from '../../types/films';
import VideoPlayer from '../video-player/video-player';

type CardProps = FilmInfo & {
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
  isPlaying: boolean;
}

function Card({ id, name, previewVideoLink, previewImage, isPlaying, onMouseMove, onMouseLeave }: CardProps): JSX.Element {
  const handleMouseMove = () => {
    onMouseMove(id);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseMove={handleMouseMove} onMouseLeave={onMouseLeave}>
      <VideoPlayer{...{ id, name, previewVideoLink, previewImage, isPlaying }} />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/:${id}`}>
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
