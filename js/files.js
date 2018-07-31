// Load a file and pass the loaded text to a function.
//   file: a file path or url
//   onLoaded: a callback function: onloaded(text)
// The way this works is: we ask it to load a file,
// and pass a function for what to do once the file is loaded.
// This is an example of an an "asynchronous" API.
// It feels overcomplicated since we're just opening a local file,
// But the asynchronous style is a great fit when loading files from the web.
function processFile(file, onLoaded) {
  console.log("Reading file: " + file);
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        console.log("Loaded file: " + file);
        onLoaded(rawFile.responseText);
      }
    }
  }
  rawFile.send(null);
}
