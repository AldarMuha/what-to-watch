import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFilm, getIsFilmLoading } from '../../store/site-data/selectors';
import { fetchFilm } from '../../store/action';
import Spinner from '../../components/spinner/spinner';
import history from '../../services/history';

function Player(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getIsFilmLoading);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const [isProgress, setIsProgress] = useState(0);
  const [isPlaying, setIsplaying] = useState<boolean>(false);
  const handleVideoPlay = () => {
    if (!isPlaying) {
      videoRef.current?.play();
      setIsplaying(true);
    } else {
      videoRef.current?.pause();
      setIsplaying(false);
    }
  };
  useEffect(() => {
    const { id } = params;
    if (id) {
      const parseId = Number(id);
      dispatch(fetchFilm(parseId));
    }
  }, [params, dispatch]);
  if (isFilmLoading) {
    return <Spinner />;
  }
  const handleTimeUpdate = () => {
    if (videoRef.current && progressRef.current) {
      setIsProgress(Math.round(Number(videoRef.current?.currentTime / videoRef.current?.duration) * 100));
    }
  };
  const handleOpenFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };
  const handleExitClick = () => {
    history.back();
  };
  return (
    <div className="player">
      <video onTimeUpdate={handleTimeUpdate} src={film?.videoLink} className="player__video" poster={film?.backgroundImage} ref={videoRef} />
      <button type="button" className="player__exit" onClick={handleExitClick}>
        Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress ref={progressRef} className="player__progress" value={isProgress} max={100} />
            <div className="player__toggler" style={{ left: `${isProgress}%` }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{film?.runTime}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleVideoPlay}>
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen" onClick={handleOpenFullScreen}>
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
