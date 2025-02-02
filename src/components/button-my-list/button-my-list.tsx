import { FilmInfo } from '../../types/films';
import { useAppDispatch } from '../../hooks';
import { postFavoriteFilms, fetchFavoriteFilms, fetchPromoFilm } from '../../store/action';

type ButtonMyListProps = {
  id: FilmInfo['id'];
  isActive: boolean;
}

function ButtonMyList({ id, isActive }: ButtonMyListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleButtonClick = () => {
    dispatch(fetchPromoFilm());
    dispatch(postFavoriteFilms({
      id,
      status: isActive ? 0 : 1
    }));
    dispatch(fetchFavoriteFilms());
  };
  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      <svg viewBox="0 0 19 20" width={19} height={20}>
        <use xlinkHref={`${!isActive ? '#add' : '#in-list'}`} />
      </svg>
      <span>My list</span>
    </button>
  );
}

export default ButtonMyList;
