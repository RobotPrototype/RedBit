// Load a file and pass the loaded text to a function.
//   file: a file path or url
//   onLoaded: a callback function: onloaded(text)
// The way this works is: we ask it to load a file,
// and pass a function for what to do once the file is loaded.
// This is an example of an an "asynchronous" API.
// It feels overcomplicated since we're just opening a local file,
// But the asynchronous style is a great fit when loading files from the web.
function processFile(file, onLoaded) {
  // this is a stupid part about working with javascript
  if (typeof XMLHttpRequest === 'function') {
    processWithXMLHttpRequest(file, onLoaded);
  } else if (typeof require === 'function') {
    processWithNodeFs(file, onLoaded);
  } else {
    console.log("Unable to process file, no loaders are defined.");
  }
}

// expect this in the browser
function processWithXMLHttpRequest(file, onLoaded) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        console.log("Loaded file: " + file);
        onLoaded(rawFile.responseText);
      } else {
        console.error("Error loading file: " + file);
        throw rawFile;
      }
    } else {
      console.log("Loading file: " + file);
    }
  }
  rawFile.send(null);
}

// expect this when runnign tests locally via nodejs
function processWithNodeFs(file, onLoaded) {
  console.log("Loading file: " + file);
  const fs = require('fs');
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.error("Error loading file: " + file);
      throw err;
    }
    console.log("Loaded file: " + file);
    onLoaded(data);
  });
}

// export the function for testing locally via nodejs
if (typeof module === 'object') {
  module.exports.processFile = processFile;
}
