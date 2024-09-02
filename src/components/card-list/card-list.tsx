import Card from '../card/card';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';
import { getFilmsShown, getIsFilmsLoading } from '../../store/site-data/selectors';

function CardList(): JSX.Element {
  const isFilmsLoading = useAppSelector(getIsFilmsLoading);
  const films = useAppSelector(getFilmsShown);
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
