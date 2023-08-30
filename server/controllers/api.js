import { get } from "mongoose";
import fetch from "node-fetch";

export const trending = async (req, res) => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIE_API,
    },
  };
  let detailResults = {};
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `An error occured: ${response.status}`;
      throw new Error(message);
    }
    const trending = await response.json();

    let itemsProcessed = 0;
    trending.results.forEach((element) => {
      getTrendingDetails(element).then((data) => {
        itemsProcessed += 1;
        detailResults[data.id] = data;
        if (itemsProcessed === trending.results.length) {
          res
            .status(200)
            .json({ trending, isBookmarked: false, detailResults });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

async function callApi(url) {
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
    console.log(error);
  }
}

async function getTrendingDetails(element) {
  let trendingUrl = "";
  if (element.media_type === "movie") {
    trendingUrl = `https://api.themoviedb.org/3/${element.media_type}/${element.id}?append_to_response=release_dates&language=en-US`;
  } else {
    trendingUrl = `https://api.themoviedb.org/3/${element.media_type}/${element.id}?append_to_response=content_ratings&language=en-US`;
  }
  return callApi(trendingUrl);
}

export const details = async (req, res) => {
  let url = "";
  let rating = "";
  if (req.params.name === "movie") {
    url = `https://api.themoviedb.org/3/${req.params.name}/${req.params.id}?append_to_response=release_dates&language=en-US`;
    let result = await callApi(url);
    let results = result.release_dates["results"];
    let filteredResults = results.filter(
      (element) => element["iso_3166_1"] === "US"
    )[0];
    rating =
      filteredResults.release_dates[0].certification || result.genres[0].name;
  } else {
    url = `https://api.themoviedb.org/3/${req.params.name}/${req.params.id}?append_to_response=content_ratings&language=en-US`;
    let result = await callApi(url);
    console.log(result);
    let results = result.content_ratings["results"];
    let filteredResults = results.filter(
      (element) => element["iso_3166_1"] === "US"
    )[0];
    rating =
      filteredResults !== undefined
        ? filteredResults.rating
        : result.genres[0].name;
  }

  return res.status(200).json(rating);
};

async function getGenre(id, mediaType) {
  let url = "";
  let rating = "";
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
      rating = result.genres[0].name;
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
    discoverResults.push({
      title: element.title,
      media_type: "movie",
      id: element.id,
      cover: element.backdrop_path,
      genre: genre,
    });
  }

  for (const element of seriesResults) {
    let genre = await getGenre(element.id, "tv");
    discoverResults.push({
      title: element.name,
      media_type: "tv",
      id: element.id,
      cover: element.backdrop_path,
      genre: genre,
    });
  }

  res.status(200).json(discoverResults);
};
