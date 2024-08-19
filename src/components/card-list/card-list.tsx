import Card from '../card/card';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

function CardList(): JSX.Element {
  const filmsShown = useAppSelector((state) => state.filmsShown);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsStateLoading);
  const films = useAppSelector((state) => (state.filmsByType).slice(0, filmsShown));
  if (isFilmsLoading) {
    return <Spinner />;
  }
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card key={film.id} {...film} />
      ))}
    </div>
  );
}
export default CardList;
