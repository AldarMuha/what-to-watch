import { useState, useEffect, useRef } from 'react';

type VideoPlayerProps = {
  previewVideoLink: string;
  previewImage: string;
  isPlaying: boolean;
}

function VideoPlayer({ previewVideoLink, previewImage, isPlaying }: VideoPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.addEventListener('loadeddata', () => setIsLoading(false));
    if (isPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.load();
    videoRef.current.pause();
  }, [isPlaying, isLoading]);

  return (
    <div className="small-film-card__image">
      <video
        autoPlay
        src={previewVideoLink}
        poster={previewImage}
        ref={videoRef}
        width={280}
        height={175}
        muted
        playsInline
      />
    </div>

  );
}

export default VideoPlayer;
