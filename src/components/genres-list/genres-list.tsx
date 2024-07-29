import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGenre, setFilms } from '../../store/action';
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
  const films = useAppSelector((state) => (activeGenre !== 'All genres') ? state.allFilms.filter((film) => film.genre === activeGenre) : state.allFilms);
  const handleClick = (genre: string) => {
    dispatch(setGenre(genre));
    dispatch(setFilms(films));
  };
  return (
    <ul className="catalog__genres-list">
      {newGenres.map((genre) => (<Genre key={genre[0]} genreKey={genre[0]} genreValue={String(genre[1])} isActive={activeGenre === genre[1]} onClick={handleClick} />))}
    </ul>
  );
}

export default GenresList;
