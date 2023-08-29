import fetch from 'node-fetch'; 


export const trending = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIE_API
    }
 }
    let detailResults = {}; 
    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            const message = `An error occured: ${response.status}`
            throw new Error(message);
        } 
        const trending = await response.json(); 

        let itemsProcessed = 0 
        trending.results.forEach((element) => {
            getTrendingDetails(element).then((data) => {
                itemsProcessed += 1; 
                detailResults[data.id] = data;   
                if(itemsProcessed === trending.results.length) {
                    res.status(200).json({trending, isBookmarked:false, detailResults}); 
                }
            })
        })

    }
    catch(error) {
        console.log(error);
        res.status(500).json({error:error}); 
    }
  
}



async function callApi(url) {
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
            const results = await response.json(); 
            return results; 
        }
        catch(error) {
            console.log(error);
        }
}

async function getTrendingDetails(element) {
    let trendingUrl = ''
    if(element.media_type === "movie") {
       trendingUrl = `https://api.themoviedb.org/3/${element.media_type}/${element.id}?append_to_response=release_dates&language=en-US`;
    } else {
        trendingUrl = `https://api.themoviedb.org/3/${element.media_type}/${element.id}?append_to_response=content_ratings&language=en-US`;
    }
    return callApi(trendingUrl);
}

export const details = async (req, res) => {
    let url = '';
    if(req.params.name === "movie")
    {
        url = `https://api.themoviedb.org/3/${req.params.name}/${req.params.id}?append_to_response=release_dates&language=en-US`;
    } else {
        url = `https://api.themoviedb.org/3/${req.params.name}/${req.params.id}?append_to_response=content_ratings&language=en-US`;
    }
    return  res.status(200).json(callApi(url));  
}
  



