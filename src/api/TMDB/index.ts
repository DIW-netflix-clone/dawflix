import axios from "axios";
import { TMDB_URL } from "@/config";

const token = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getSeries = async (url = "discover/tv") => {
  try {
    console.log(options);
    const { data } = await axios.get(`${TMDB_URL}/${url}`, options);
    return await data.results;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};

export const getMovies = async (url = "discover/movie") => {
  try {
    const { data } = await axios.get(`${TMDB_URL}/${url}`, options);
    return await data.results;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};
