import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  id: number;
  name: string;
  previewVideoLink: string;
  previewImage: string;
  isPlaying: boolean;
}

function VideoPlayer({ previewVideoLink, previewImage, id, name, isPlaying }: VideoPlayerProps): JSX.Element {
  //const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    //videoRef.current.addEventListener('loadeddata', () => setIsLoading(false));

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  return (
    <div className="small-film-card__image">
      {isPlaying ?
        <video
          autoPlay
          src={previewVideoLink}
          poster={previewImage}
          ref={videoRef}
          width={280}
          height={175}
          muted
          playsInline
        /> :
        <img src={previewImage} alt={name} width={280} height={175} />}
    </div>

  );
}

export default VideoPlayer;
