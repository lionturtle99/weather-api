export default class GiphyService{
  static getGif(description) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${description}&api_key=${process.env.GIPHY_API_KEY}&limit=1`)
    .then(function(response){
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error){
      return Error(error);
    });
  }
}
