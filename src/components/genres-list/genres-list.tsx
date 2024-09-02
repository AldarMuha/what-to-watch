import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilmsByGenre } from '../../store/action';
import { setGenre } from '../../store/site-process/site-process';
import { getGenre } from '../../store/site-process/selector';
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
  const activeGenre = useAppSelector(getGenre);
  const handleClick = useCallback((genre: string) => {
    dispatch(setGenre(genre));
    dispatch(setFilmsByGenre(genre));
  }, [dispatch]);
  return (
    <ul className="catalog__genres-list">
      {newGenres.map((genre) => (<Genre key={genre[0]} genreKey={genre[0]} genreValue={String(genre[1])} isActive={activeGenre === genre[1]} onClick={handleClick} />))}
    </ul>
  );
}
export default GenresList;
