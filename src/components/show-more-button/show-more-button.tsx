import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFilmsShown } from '../../store/action';

function ShowMoreButton(): JSX.Element {
  const isActive = useAppSelector((state) => state.isActiveShowMoreButton);
  const filmsShown = useAppSelector((state) => state.filmsShown);
  const dispatch = useAppDispatch();
  const CARDS_PER_PORTION = 8;
  const handleClickShowMoreButton = () => {
    dispatch(getFilmsShown(filmsShown.length + CARDS_PER_PORTION));
  };
  return (
    <button className={`catalog__button${!isActive ? ' visually-hidden' : ''}`} type="button" onClick={handleClickShowMoreButton}>Show more</button>
  );
}

export default ShowMoreButton;
