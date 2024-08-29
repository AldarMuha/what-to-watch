type TabProps = {
  idTab: number;
  title: string;
  isActive: number;
  idFilm: number;
  onClickTab: () => void;
}

function Tab({ idTab, title, isActive, idFilm, onClickTab }: TabProps): JSX.Element {
  return (
    <li className={`film-nav__item ${(isActive === idTab) ? ' film-nav__item--active' : ''}`} onClick={onClickTab}>
      <div className="film-nav__link">{title}</div>
    </li>
  );
}

export default Tab;
