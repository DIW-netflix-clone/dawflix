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

export const getSeries = async () => {
  try {
    console.log(options);
    const { data } = await axios.get(`${TMDB_URL}/discover/tv`, options);
    return data.results;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};
