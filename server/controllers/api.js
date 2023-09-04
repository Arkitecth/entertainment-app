import fetch from "node-fetch";
import User from "../model/User.js";
export const trending = async (req, res) => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

  const trending = await callApi(url);
  const trendingData = trending["results"];
  const trendingResults = [];

  for (const element of trendingData) {
    let genre = await getGenre(element.id, element.media_type);
    let airDate =
      element.release_date === undefined
        ? element.first_air_date.split("-")[0]
        : element.release_date.split("-")[0];
    let match = await checkDatabase(req.params.email, element, trendingResults);
    if (match) continue;
    trendingResults.push({
      title: element.name || element.title,
      media_type: element.media_type,
      id: element.id,
      date: airDate,
      cover: element.backdrop_path,
      genre: genre,
      isBookmarked: false,
    });
  }
  res.status(200).json(trendingResults);
};

async function checkDatabase(email, element, results) {
  let match = false;
  const user = await User.findOne({
    email: email,
  });
  for (const userMovie of user["movies"]) {
    if (element.id === userMovie.id) {
      results.push(userMovie);
      match = true;
      break;
    } else {
      match = false;
    }
  }
  return match;
}

async function callApi(url, req, res) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIE_API,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `An error occured: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results;
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getGenre(id, mediaType) {
  let url = "";
  let rating = "Nan";
  if (mediaType === "movie") {
    url = `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=release_dates&language=en-US`;
    let result = await callApi(url);
    let results = result.release_dates["results"];
    let filteredResults = results.filter(
      (element) => element["iso_3166_1"] === "US"
    )[0];
    if (
      filteredResults !== undefined &&
      filteredResults.release_dates[0].certification !== ""
    ) {
      rating = filteredResults.release_dates[0].certification;
    } else {
      if (result.genre !== undefined) rating = result.genres[0].name;
    }
  } else {
    url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=content_ratings&language=en-US`;
    let result = await callApi(url);
    let results = result.content_ratings["results"];
    let filteredResults = results.filter(
      (element) => element["iso_3166_1"] === "US"
    )[0];
    if (filteredResults !== undefined && filteredResults.rating !== "") {
      rating = filteredResults.rating;
    } else {
      if (result.genres.length === 0) {
        rating = "Nan";
      } else {
        rating = result.genres[0].name;
      }
    }
  }
  return rating;
}

export const discover = async (req, res) => {
  const discoverMovieUrl =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-";
  const discoverSeriesUrl =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

  let movie = await callApi(discoverMovieUrl);
  let series = await callApi(discoverSeriesUrl);
  let movieResults = movie["results"];
  let seriesResults = series["results"];
  let discoverResults = [];

  for (const element of movieResults) {
    let genre = await getGenre(element.id, "movie");
    let match = await checkDatabase(req.params.email, element, discoverResults);
    if (match) continue;
    discoverResults.push({
      title: element.title,
      media_type: "movie",
      id: element.id,
      cover: element.backdrop_path,
      date: element.release_date.split("-")[0],
      genre: genre,
      isBookmarked: false,
    });
  }

  for (const element of seriesResults) {
    let genre = await getGenre(element.id, "tv");
    let match = await checkDatabase(req.params.email, element, discoverResults);
    if (match) continue;
    discoverResults.push({
      title: element.name,
      media_type: "tv",
      id: element.id,
      cover: element.backdrop_path,
      date: element.first_air_date.split("-")[0],
      genre: genre,
      isBookmarked: false,
    });
  }

  res.status(200).json(discoverResults);
};

export const search = async (req, res) => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${req.params.search}&include_adult=false&language=en-US&page=1`;
  const search = await callApi(url);
  const searchData = search["results"];
  const searchResults = [];

  for (const element of searchData) {
    if (element.media_type === "person" || element.backdrop_path === null)
      continue;
    let genre = await getGenre(element.id, element.media_type);
    let airDate =
      element.release_date === undefined
        ? element.first_air_date.split("-")[0]
        : element.release_date.split("-")[0];
    let match = await checkDatabase(req.params.email, element, searchResults);
    if (match) continue;
    searchResults.push({
      title: element.name || element.title,
      media_type: element.media_type,
      id: element.id,
      date: airDate,
      cover: element.backdrop_path,
      genre: genre,
      isBookmarked: false,
    });
  }
  res.status(200).json(searchResults);
};
