import { useState } from 'react';

import Card from '../card/card';
import { FilmInfo } from '../../types/films';

type CardListProps = {
  films: FilmInfo[];
}

function CardList({ films }: CardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const handleCardMouseMove = (id: number) => {
    setActiveCard(id);
  };
  const handleCardMouseLeave = () => {
    setActiveCard(null);
  };
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card key={film.id} {...film} activeCard={activeCard} onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} />
      ))}
    </div>
  );
}

export default CardList;
