require("dotenv").config();
console.log('this is loaded');
// Get Spotify key and secret from .env
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
// Bands in Town Artist Events url
var bandUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
// Omdb api url
var movieUrl = `http://www.omdbapi.com/?t=${userText}&y=&plot=short&apikey=trilogy`


