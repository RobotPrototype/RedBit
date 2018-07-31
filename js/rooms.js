const roomSpec = {
  platforms: [{
      top: 2,
      bottom: -1,
      left: -4,
      right: 5,
      tileArt: "Assets/Sprites/LSurfaceTest.png",
      tileSize: 32
    },
    {
      top: -3,
      bottom: -5,
      left: -1,
      right: 2,
      tileArt: "Assets/Sprites/TileTest.png",
      tileSize: 32
    },
    {
      top: 5,
      bottom: 5,
      left: 3,
      right: 3,
      tileArt: "Assets/Sprites/TileTest.png",
      tileSize: 32
    },
    {
      top: 5,
      bottom: 5,
      left: -1,
      right: 1,
      tileArt: "Assets/Sprites/TileTest.png",
      tileSize: 32
    },
    {
      top: 6,
      bottom: 4,
      left: -4,
      right: -4,
      tileArt: "Assets/Sprites/TileTest.png",
      tileSize: 32
    }
  ]
};

function parseRoom(roomSpec) {
  var top = 0;
  var bottom = 0;
  var left = 0;
  var right = 0;
  var tiles = [];

  var nPlatforms = roomSpec.platforms.length;
  for (var i = 0; i < nPlatforms; i++) {
    var platform = roomSpec.platforms[i];

    top = Math.max(top, platform.top);
    bottom = Math.min(bottom, platform.bottom);
    left = Math.min(left, platform.left);
    right = Math.max(right, platform.right);

    var platformTiles = parsePlatform(platform);
    tiles = tiles.concat(platformTiles);
  }
  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    tiles: tiles,
  };
}

function parsePlatform(platformSpec) {
  var tiles = [];
  for (var row = platformSpec.bottom; row <= platformSpec.top; row++) {
    for (var col = platformSpec.left; col <= platformSpec.right; col++) {
      tiles.push({
        row: row,
        col: col,
        size: platformSpec.tileSize,
        art: platformSpec.tileArt,
        type: tileType(row, col, platformSpec),
      })
    }
  }
  return tiles;
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
function tileType(row, col, platformSpec) {
  var isTop = row == platformSpec.top ? 1 : 0;
  var isBottom = row == platformSpec.bottom ? 2 : 0;
  var isLeft = col == platformSpec.left ? 4 : 0;
  var isRight = col == platformSpec.right ? 8 : 0;
  var type = isTop + isBottom + isLeft + isRight;
  return type;
}

function drawRoom(scene) {
  var room = parseRoom(roomSpec);
  var cameraRow = (room.top + room.bottom) / 2;
  var cameraCol = (room.right + room.left) / 2;

  for (var i = 0; i < room.tiles.length; i++) {
    var tile = room.tiles[i];
    console.log(tile);

    var tileFactory = spriteFactory(scene, tile.art, tile.size, tile.art, 1);
    tileSprite = sprite(tileFactory, tile.row + "," + tile.col);

    var y = (tile.row * tile.size) - (cameraRow * tile.size);
    var x = (tile.col * tile.size) - (cameraCol * tile.size);
    tileSprite.position.y = y;
    tileSprite.position.x = x;
    tileSprite.cellIndex = tile.type + 1;
    console.log(tileSprite);
  }
}
