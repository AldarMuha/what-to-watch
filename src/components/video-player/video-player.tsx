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
    const handleLoadedData = () => {
      setIsLoading(false);
    };
    videoRef.current.addEventListener('loadeddata', handleLoadedData);
    setIsLoading(false);
    if (isPlaying) {
      if (!isLoading) {
        videoRef.current.play();
      }
    } else {
      videoRef.current.load();
      videoRef.current.pause();
    }
    return videoRef.current.removeEventListener('loadeddata', handleLoadedData);
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
