import { useAppSelector, useAppDispatch } from '../../hooks';
import { setFilmsShown, setIsActive } from '../../store/action';

function ShowMoreButton(): JSX.Element {
  const isActive = useAppSelector((state) => state.isActiveShowMoreButton);
  const filmsShown = useAppSelector((state) => state.filmsShown);
  const films = useAppSelector((state) => state.filmsByType);
  const dispatch = useAppDispatch();
  const CARDS_PER_PORTION = 8;
  let step = filmsShown;
  const handleClickShowMoreButton = () => {
    step += CARDS_PER_PORTION;
    if (step > films.length) {
      dispatch(setFilmsShown(films.length));
      dispatch(setIsActive(false));
    } else {
      dispatch(setFilmsShown(step));
      dispatch(setIsActive(true));
    }
  };
  return (
    <button className={`catalog__button${!isActive ? ' visually-hidden' : ''}`} type="button" onClick={handleClickShowMoreButton}>Show more</button>
  );
}
export default ShowMoreButton;
