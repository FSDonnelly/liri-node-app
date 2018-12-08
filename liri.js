require("dotenv").config();
// Intialize File System
var fs = require("fs");
//Local Files
// var keys = require("./keys.js");
//NPM Packages
var axios = require("axios");
var moment = require("moment");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//  if (err) {
//    return console.log('Error occurred: ' + err);
//  }

// console.log(data);
// })


//Creates an object to auth Spotify queries
// var spotify = new Spotify(keys.spotify);

//Global Variables
var defaultMusic = "The Sign";
var defaultMovie = "Mr. Nobody";

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "spotify-this-song":
        mySpotify();
        break;
    case "movie-this":
        myMovie();
        break;
    case "concert-this":
        myBand();
        break;
    case "do-what-it-says":
        random();
        break;
    default: // Adds user instructions to re-select an available action
        console.log("Please select an action request listed below:");
        console.log("concert-this, spotify-this-song, movie-this, do-what-it-says");
        break;
}
// Spotify API 
// -------------------------------------------------------------------

function mySpotify() {
    defaultMusic = "The Sign";
    // Take in the command line arguments
    var nodeArgs = process.argv;

    // Create an empty string for holding the movie name
    var trackName = "";

    // Capture all the words in the movie name (ignore first 3 node arguments
    for (var i = 3; i < nodeArgs.length; i++) {

         // If TRUE, Build a string with the movie name.
         if (i > 3 && i < nodeArgs.length) {
            trackName = trackName + "+" + nodeArgs[i];
        } else {
            trackName += nodeArgs[i];
        }
    }
    spotify.search({ type: 'track', query: value, limit: '1' }, function (err, data) {
        if (err) {
            console.log('Error occured: ' + err);
        } else {
            // Returns JSON info for selected track
            console.log(JSON.stringify(data, null, 2));

            console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n");
            console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n");
            console.log("Album " + JSON.stringify(data.tracks.items[0].album.name) + "\n");
            console.log("Link: " + JSON.stringify(data.tracks.itmes.external_urls.spotify) + "\n");
        }
    });
};
// MOVIE Omdb API
// -------------------------------------------------------------------

function myMovie() {
    
    // Take in the command line arguments
    var nodeArgs = process.argv;

    // Create an empty string for holding the movie name
    var movieName = "";

    // Capture all the words in the movie name (ignore first 3 node arguments
    for (var i = 3; i < nodeArgs.length; i++) {

        if (process.argv[2]==="movie-this"  && process.argv === 3){
            movieName = defaultMovie;
        
        // If TRUE, Build a string with the movie name.
        }else if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    // Create URL query variable to store URL to request JSON from OMDB API
    var queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy&r=json&tomatoes=true`;
    console.log(queryUrl)
    // Run request to OMDB API with URL varible
    request(queryUrl, function (error, response, body) {

        // If the request was successful ... 
        if (error) {
            return console.log(error);
        }
        if (!error && response.statusCode === 200) {

            var body = JSON.parse(body);

            // Then log the body details from the OMDB API
            console.log("\nMovie Title: " + body.Title + "\n ");
            console.log("Year Released: " + body.Released + "\n ");
            console.log("Rating: " + body.Rated + "\n ");
            console.log("Production Country: " + body.Country + "\n ");
            console.log("Language: " + body.Language + "\n ");
            console.log("Plot: " + body.Plot + "\n ");
            console.log("Actors: " + body.Actors + "\n ");
        } else {
            console.log(error);
        };
    });
}

// Concert API
// -------------------------------------------------------------------

function myBand() {

    // Take in the command line arguments
    var nodeArgs = process.argv;

    // Create an empty string for holding the movie name
    var bandName = "";

    // Capture all the words in the movie name (ignore first 3 node arguments
    for (var i = 3; i < nodeArgs.length; i++) {

        // If TRUE, Build a string with the movie name.
        if (i > 3 && i < nodeArgs.length) {
            bandName = bandName + "+" + nodeArgs[i];
        } else {
            bandName += nodeArgs[i];
        }
    }

    // Create URL query variable to store URL to request JSON from Concert API
    var bandUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=codingbootcamp`;

    // Run request to Concert API with URL varible
    request(bandUrl, function (error, response, body) {

        // If the request was successful ... 
        if (error) {
            return console.log(error);
        }
        if (!error && response.statusCode === 200) {

            var body = JSON.parse(response.body);
            for (var i = 0; i < body.length; i++) {
                // and display data back from a band
                // console.log(response)
                console.log("\nName of the Venue: " + body[i].venue.name + "\n ");
                console.log("Location: " + body[i].venue.city + "\n ");
                console.log("Date of Event: " + moment(body.datetime).format("MM/DD/YYYY") + "\n ");
            }
        } else {
            console.log(error);
        };
    });
}

// DO-WHAT-IT-SAYS 
// -------------------------------------------------------------------
// Function takes the data from my random.txt file and 
// passes it as a search value in the Spotify function

function random() {

    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log(data);

            //Converst data in text file into array
            var arr = data.split(",");
            value = arr[1];
            // If command name at index[0] matches the string, invoke the function
            if (arr[0] == "movie-this") {
                myMovie(value);
            }
            else if (arr[0] == "spotify-this-song") {
                mySpotify(value);
            }
            else if (arr[0] == "concert-this") {
                myBand(value);
            }
        }
    });
};


