import fetch from 'node-fetch';

export const trending = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIE_API
    }
 };
  
    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            const message = `An error occured: ${response.status}`
            throw new Error(message);
        } 
        const trending = await response.json(); 
        res.status(200).json({trending, isBookmarked:false},); 
    }
    catch(error) {
        console.log(error);
        res.status(200).json({error:error}); 
    }
  
}


export const movieDetails = async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?append_to_response=release_dates&language=en-US`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIE_API
    }
 };
  
    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            const message = `An error occured: ${response.status}`
            throw new Error(message);
        } 
        const details = await response.json(); 
        res.status(200).json(details); 
    }
    catch(error) {
        console.log(error);
        res.status(200).json({error:error}); 
    }
  
}

export const seriesDetails = async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?append_to_response=release_date&language=en-US`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIE_API
    }
 };
  
    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            const message = `An error occured: ${response.status}`
            throw new Error(message);
        } 
        const details = await response.json(); 
        res.status(200).json(details); 
    }
    catch(error) {
        console.log(error);
        res.status(200).json({error:error}); 
    }
  
}


