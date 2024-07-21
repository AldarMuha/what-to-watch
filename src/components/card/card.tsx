import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

import type { FilmInfo } from '../../types/films';
import VideoPlayer from '../video-player/video-player';

function Card({ id, name, previewVideoLink, previewImage }: FilmInfo): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleCardMouseEnter = () => {
    setIsPlaying(true);
  };
  const handleCardMouseLeave = () => {
    setIsPlaying(false);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}>
      <VideoPlayer{...{ previewVideoLink, previewImage, isPlaying }} />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${id}`}>
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
