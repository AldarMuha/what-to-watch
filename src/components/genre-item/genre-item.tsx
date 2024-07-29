type GenreListProps = {
  genreKey: string;
  genreValue: string;
  isActive: boolean;
  onClick: (genre: string) => void;
}

function Genre({ genreKey, genreValue, isActive, onClick }: GenreListProps): JSX.Element {
  const handleClick = () => {
    onClick(genreValue);
  };
  return (
    <li className={`catalog__genres-item${isActive ? ' catalog__genres-item--active' : ''}`} onClick={handleClick}>
      <a className="catalog__genres-link">{genreKey}</a>
    </li>
  );
}

export default Genre;
