import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGenre } from '../../store/action';
import Genre from '../genre-item/genre-item';

const genres = {
  'All genres': 'All genres',
  'Comedies': 'Comedy',
  'Crime': 'Crime',
  'Documentary': 'Documentary',
  'Dramas': 'Drama',
  'Horror': 'Horror',
  'Kids & Family': 'Kids & Family',
  'Romance': 'Romance',
  'Sci-Fi': 'Sci-Fi',
  'Thrillers': 'Thriller',
};


function GenresList(): JSX.Element {
  const newGenres = Object.entries(genres);
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector((state) => state.genre);
  const handleClick = (genre: string) => {
    if (genre !== activeGenre) {
      dispatch(setGenre(genre));
    }
  };
  return (
    <ul className="catalog__genres-list">
      {newGenres.map((genre) => (<Genre key={genre[0]} genreKey={genre[0]} genreValue={String(genre[1])} isActive={activeGenre === genre[1]} onClick={handleClick} />))}
    </ul>
  );
}

export default GenresList;
