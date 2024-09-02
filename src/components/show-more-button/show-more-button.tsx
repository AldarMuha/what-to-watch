import { useAppSelector, useAppDispatch } from '../../hooks';
import { showMoreFilms } from '../../store/action';
import { getFilmsByGenre, getFilmsShown } from '../../store/site-data/selectors';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmsByGenre = useAppSelector(getFilmsByGenre);
  const filmsShown = useAppSelector(getFilmsShown);
  const isMore = filmsShown < filmsByGenre;

  const handleClickShowMoreButton = () => {
    dispatch(showMoreFilms());
  };
  return (
    <button className={`catalog__button${!isMore ? ' visually-hidden' : ''}`} type="button" onClick={handleClickShowMoreButton}>Show more</button>
  );
}
export default ShowMoreButton;
