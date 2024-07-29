//import { useState } from 'react';

import Card from '../card/card';
import { useAppSelector } from '../../hooks';

function CardList(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  /*
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleCardMouseMove = (id: number) => {
    setTimeout(() => {
      setActiveCard(id);
      setIsPlaying(!isPlaying);
    }, 500);
  };
  const handleCardMouseLeave = () => {
    setActiveCard(null);
    setIsPlaying(!isPlaying);
  };
*/
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card key={film.id} {...film} />
      ))}
    </div>
  );
}

export default CardList;
