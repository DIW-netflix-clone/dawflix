import {
  getMovideById,
  getMovieVideosById,
  getSerieById,
  getSerieVideosById,
} from "@/api/TMDB";
import { Movie } from "@/types/TMDB/Movies";
import { Serie } from "@/types/TMDB/Series";
import { VideoResponse } from "@/types/TMDB/Videos";
import { createRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";

const Display = () => {
  const { id, type } = useParams();
  const [data, setData] = useState<Movie | Serie | null>(null);
  const [videos, setVideos] = useState<VideoResponse | null>(null);
  const [playing, setPlaying] = useState(true);
  const playerRef = createRef<ReactPlayer>();

  useEffect(() => {
    const getData = async () => {
      setData(
        type === "movies" ? await getMovideById(id!) : await getSerieById(id!)
      );
      setVideos(
        type === "movies"
          ? await getMovieVideosById(id!)
          : await getSerieVideosById(id!)
      );
    };
    getData();
  }, [id, type]);

  const getVideoUrl = () => {
    return videos?.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    )?.key;
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <iframe
        width="100%"
        height="560px"
        src={`https://www.youtube.com/embed/${getVideoUrl()}?autoplay=1&autohide=1&controls=0`}
        allowFullScreen
        frameBorder="0"
        style={{ border: "none" }}
      ></iframe>
      {/* <ReactPlayer
        ref={playerRef}
        url={`${YOUTUBE_URL}${getVideoUrl()}?controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1`}
        playing={playing}
        width="100%"
        height="100%"
      /> */}
    </div>
  );
};

export default Display;
