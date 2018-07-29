var room = {
  model: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 0, 7],
    [0, 0, 1],
  ],
  tileArt: "Assets/Sprites/LSurfaceTest.png",
  tileSize: 32,
}

function drawRoom(scene) {
  var numRows = room.model.length;
  var numCols = room.model[0].length;
  var halfTile = room.tileSize / 2;

  var tileFactory = spriteFactory(scene, room.tileArt, room.tileSize, "room", numRows * numCols);

  for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
      var cellIndex = room.model[row][col];
      if (cellIndex) {
        var y = (row * room.tileSize) + halfTile - (numRows * halfTile);
        var x = (col * room.tileSize) + halfTile - (numCols * halfTile);
        tile = sprite(tileFactory, row + "-" + col);
        tile.position.y = y;
        tile.position.x = x;
        tile.cellIndex = cellIndex;
        console.log(tile);
      }
    }
  }
}
