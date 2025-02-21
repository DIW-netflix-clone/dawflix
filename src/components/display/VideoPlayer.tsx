import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

type PROPS = {
  id: string;
};

const VideoPlayer = ({ id }: PROPS) => {
  const [timePlayed, setTimePlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    const enterFullscreen = () => {
      const iframe = document.querySelector("iframe");
      if (iframe && iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    };

    enterFullscreen();
  }, []);

  const handleProgress = (state) => {
    setTimePlayed(state.played);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setTimePlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  return (
    <div>
      <ReactPlayer
        width="100%"
        ref={playerRef}
        url={`https://www.youtube.com/embed/${id}`}
        controls={false}
        playing={isPlaying}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              modestbranding: 1,
              iv_load_policy: 3,
              rel: 0,
              fs: 1,
            },
          },
        }}
        loop
        onProgress={handleProgress}
        onPlay={handlePlay}
        onPause={handlePause}
      />

      {/* <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <input
          type="range"
          style={{ width: "100%", margin: "0" }}
          min={0}
          max={1}
          step={"0.01"}
          value={timePlayed}
          onChange={handleSeekChange}
        />

        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "Pausar" : "Reproducir"}
        </button>
      </div> */}
    </div>
  );
};

export default VideoPlayer;
