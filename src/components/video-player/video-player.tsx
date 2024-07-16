type VideoPlayerProps = {
  previewVideoLink: string;
  posterImage: string;
}

function VideoPlayer({ previewVideoLink, posterImage }: VideoPlayerProps): JSX.Element {
  return (
    <video src={previewVideoLink} className="player__video" poster={posterImage} autoPlay muted />
  );
}

export default VideoPlayer;
