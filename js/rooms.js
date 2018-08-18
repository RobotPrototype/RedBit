//having trouble grokking spriteFactories and StyleOccurrences
//room.js a module?
// does this determine which type of tile to draw based on neighboring tiles? Or is
//that manually determined by us when we create a JSON file?

//How can I create my own JSON file?

function loadRoom(scene, tileFile, styleFile) {
//declare a callable function that loads a room
  processFile(tileFile, function(tileText) {
    var tiles = JSON.parse(tileText);
    var nRows = tiles.length;
    var nCols = tiles[0].length;
    console.log(`Tiles: ${nRows} rows x ${nCols} cols`);
    var styleOccurrences = countStyleOccurrences(tiles);
    console.log("Style occurrences: " + styleOccurrences);
    //determines the size of the room & the number of tiles to draw?

    processFile(styleFile, function(styleText) {
      var styles = JSON.parse(styleText);
      console.log("Styles: " + styles.length);

      var spriteFactories = createSpriteFactories(scene, styles, styleOccurrences);

      for (var row = 0; row < nRows; row++) {
        for (var col = 0; col < nCols; col++) {
          var styleIndex = tiles[row][col];
          if (!styleIndex) {
            continue;
          }

          var factory = spriteFactories[styleIndex - 1];
          var tileSprite = sprite(factory, row + "," + col);
          var style = styles[styleIndex - 1];
          tileSprite.position.y = row * style.tileSize + style.tileSize / 2;
          tileSprite.position.x = col * style.tileSize + style.tileSize / 2;

          var isTop = row == 0 || styleIndex != tiles[row - 1][col];
          var isBottom = row == nRows - 1 || styleIndex != tiles[row + 1][col];
          var isLeft = col == 0 || styleIndex != tiles[row][col - 1];
          var isRight = col == nCols - 1 || styleIndex != tiles[row][col + 1];
          var type = tileType(isTop, isBottom, isLeft, isRight);
          tileSprite.cellIndex = type;
        }
      }
    })
  })
}

function countStyleOccurrences(tiles) {
  var occurrences = [];
  var nRows = tiles.length;
  var nCols = tiles[0].length;
  for (var row = 0; row < nRows; row++) {
    for (var col = 0; col < nCols; col++) {
      styleIndex = tiles[row][col];
      if (occurrences.length > styleIndex && !Number.isNaN(occurrences[styleIndex])) {
        //isNan?
        occurrences[styleIndex]++;
      } else {
        occurrences[styleIndex] = 0;
      }
    }
  }
  return occurrences;
}

function createSpriteFactories(scene, styles, styleOccurrences) {
  var nFactories = styles.length;
  var spriteFactories = new Array(nFactories);
  for (var i = 0; i < nFactories; i++) {
    var style = styles[i];
    var spriteCount = styleOccurrences[i];
    spriteFactories[i] = spriteFactory(scene, style.tileArt, style.tileSize, style.tileArt, spriteCount);
  }
  return spriteFactories;
}

// there are 16 types of tile!
// because a tile has four edges, and each edge can be border or interior
// we need to put these in order, so that we can make sprite sheets
// let's score the edges and add them up in binary:
//   top  = 1
//   bottom = 2
//   left = 4
//   right = 8
// this makes middle/interor = 0 and singleton = 15
function tileType(isTop, isBottom, isLeft, isRight) {
  return isTop * 1 + isBottom * 2 + isLeft * 4 + isRight * 8;
}
