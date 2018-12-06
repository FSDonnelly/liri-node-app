require("dotenv").config();
// access spotify
var spotify = new Spotify(keys.spotify);
// including the fs or filesystem package
var fs = require("fs");

var axios = require("axios");
// take in a user input
var userInput = process.argv[2];
var userText = "";
// Bands in Town Artist Events url
var bandUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
// Omdb api url
var movieUrl = `http://www.omdbapi.com/?t=${userText}&y=&plot=short&apikey=trilogy`;

