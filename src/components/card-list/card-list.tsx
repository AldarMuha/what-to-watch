import Card from '../card/card';
import { useAppSelector } from '../../hooks';

function CardList(): JSX.Element {
  const films = useAppSelector((state) => state.filmsShown);
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card key={film.id} {...film} />
      ))}
    </div>
  );
}

export default CardList;
