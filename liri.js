require("dotenv").config();
// access spotify
// require("./keys.js").config();
// var spotify = new Spotify(keys.spotify);
// console.log(keys.spotify);
// including the fs or filesystem package
var fs = require("fs");

var axios = require("axios");
// take in a user input
var userInput = process.argv[2];
var userText = "";
for(var i = 3; i < process.argv.length; i++) {
    userText += process.argv[i] + "";
}
// Bands in Town Artist Events url
var bandUrl = `https://rest.bandsintown.com/artists/${userText}/events?app_id=codingbootcamp`;
console.log(bandUrl);
// Omdb api url
var movieUrl = `http://www.omdbapi.com/?t=${userText}&y=&plot=short&apikey=trilogy`;
console.log(movieUrl);
if (userInput === "movie-this") {
    // hit the url with axios 
    axios.get(movieUrl).then(function(response){
        // and display data back from a movie
        console.log(response.data);
       
        
    });
} else if (userInput === "concert-this") {
    axios.get(bandUrl).then(function(response){
// and display data back from a band
console.log(response.data);
});
} else if (userInput === "spotify-this-song") {
    axios.get(spotify).then(function(response){
// and display data back from a band
console.log(response.data);
});
} else {
    console.log("No command found!");
}
