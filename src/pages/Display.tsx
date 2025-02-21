import {
  getMovideById,
  getMovieVideosById,
  getSerieById,
  getSerieVideosById,
} from "@/api/TMDB";
import VideoPlayer from "@/components/display/VideoPlayer";
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
      <VideoPlayer id={getVideoUrl()!} />
    </div>
  );
};

export default Display;
