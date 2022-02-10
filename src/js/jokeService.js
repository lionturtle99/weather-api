export default class ChuckNorris {
  static makeAJoke() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.chucknorris.io/jokes/random`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
  
      request.open("GET", url, true);
      request.send();
    });
  }
}