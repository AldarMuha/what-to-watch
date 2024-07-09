import Main from '../../pages/main/main';
import { FilmInfo } from '../../types/films';

type AppProps = {
  film: FilmInfo;
}

function App({ film }: AppProps): JSX.Element {
  return <Main film={film} />;
}

export default App;
