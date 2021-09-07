// load core http mod

const http = require("http");

// load core filesystem mod, 

// Promises -alternative to callbacks that doesn't jam up server per request (async)

const fs = require('fs').promises;

// create function that responds to http requests
const requestListener = function (req, res) {
  console.log(req.url);

  if (req.url === "/") {
    //if request is for root, return the html file. __dirname is the absolute path of where node code is running. __ indicates special variable. .thenmethod to handle success - contents parameter contains HTML file data
    fs.readFile(__dirname + "/page.html")
    .then(contents => {
      // set http response header enry
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.writeHead(200);

      res.end(contents);


    });
  } else {
    // if not, then return the json file
    fs.readFile(__dirname + "/data.json")
    .then(contents => {
      // set http response header entry
      res.setHeader("Content-type", "application/json; charset=UTF-8");
      res.writeHead(200);
      res.end(contents);
    })



  }

};

// create http server instance
const server= http.createServer(requestListener);

// define tcp port and IP address
const host = "0.0.0.0";
const port = "8080";

server.listen(
  port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);

// above line is shorthad for the following:
// console.log("Server is running on http://" + host + ":" + port);
  }

);

