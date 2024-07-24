import { useState } from 'react';

import { FilmInfo } from '../../types/films';
import Tab from '../tab/tab';
import Overview from '../overview/overview';
import Details from '../details/details';
import Reviews from '../reviews/reviews';

type TabsProps = {
  film: FilmInfo;
}

function Tabs({ film }: TabsProps): JSX.Element {
  const [isActiveTab, setIsActiveTab] = useState<number>(0);
  const handleTabClick = (idTab: number) => {
    setIsActiveTab(idTab);
  };
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <Tab idTab={0} title='Overview' isActive={isActiveTab} idFilm={film.id} onClickTab={() => handleTabClick(0)} />
          <Tab idTab={1} title='Details' isActive={isActiveTab} idFilm={film.id} onClickTab={() => handleTabClick(1)} />
          <Tab idTab={2} title='Reviews' isActive={isActiveTab} idFilm={film.id} onClickTab={() => handleTabClick(2)} />
        </ul>
      </nav>
      <Overview idTab={0} isActive={isActiveTab} film={film} />
      <Details idTab={1} isActive={isActiveTab} film={film} />
      <Reviews idTab={2} isActive={isActiveTab} />
    </div >
  );
}

export default Tabs;
