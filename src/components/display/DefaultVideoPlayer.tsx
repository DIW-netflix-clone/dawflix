// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaRedo,
  FaLock,
  FaFolder,
  FaClosedCaptioning,
  FaStepForward,
  FaPause,
} from "react-icons/fa";
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri";
import styles from "./DefaultVideoPlayer.module.scss";
import Video from "@/assets/videos/demo.mp4";

const DefaultVideoPlayer = () => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    let timeout;

    const handleMouseMove = () => {
      setControlsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setControlsVisible(false), 2500);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (seconds) => {
    if (playerRef.current) {
      const newTime = playerRef.current.getCurrentTime() + seconds;
      playerRef.current.seekTo(newTime, "seconds");
      setPlayed(newTime / playerRef.current.getDuration());
    }
  };

  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleEnded = () => {
    playerRef.current.seekTo(0);
    setPlayed(0);
    setPlaying(true);
  };

  return (
    <div className={styles.video_container}>
      <ReactPlayer
        ref={playerRef}
        url={Video}
        playing={playing}
        width="100%"
        height="100%"
        controls={false}
        onProgress={handleProgress}
        onEnded={handleEnded}
      />

      <div
        className={`${styles.controls_overlay} ${
          controlsVisible ? styles.show : styles.hide
        }`}
      >
        <div className={styles.controls_top}>
          <button
            onClick={() => handleSeek(-10)}
            className={styles.control_button}
          >
            <RiReplay10Fill />
          </button>
          <button onClick={handlePlayPause} className={styles.play_button}>
            {playing ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>
          <button
            onClick={() => handleSeek(10)}
            className={styles.control_button}
          >
            <RiForward10Fill />
          </button>
        </div>
      </div>

      <div
        className={`${styles.controls_bottom} ${
          controlsVisible ? styles.show : styles.hide
        }`}
      >
        <input
          type="range"
          style={{ width: "100%", margin: "0" }}
          min={0}
          max={1}
          step={"0.01"}
          value={played}
          onChange={handleSeekChange}
        />
        <div className={styles.controls_left}>
          <button className={styles.control_icon}>
            <FaRedo />
          </button>
          <button className={styles.control_icon}>
            <FaLock />
          </button>
          <button className={styles.control_icon}>
            <FaFolder />
          </button>
          <button className={styles.control_icon}>
            <FaClosedCaptioning />
          </button>
        </div>
        <button className={styles.control_icon}>
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};

export default DefaultVideoPlayer;
