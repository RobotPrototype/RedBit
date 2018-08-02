var x = 0;
var dx = 0;
var y = 0;
var dy = 0;
var s = 10;

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      dy = -s;
      break;
    case "ArrowDown":
      dy = s;
      break;
    case "ArrowRight":
      dx = s;
      break;
    case "ArrowLeft":
      dx = -s;
      break;
  }
}

function onKeyUp(event) {
  switch (event.key) {
    case "ArrowUp":
      dy = 0;
      break;
    case "ArrowDown":
      dy = 0;
      break;
    case "ArrowRight":
      dx = 0;
      break;
    case "ArrowLeft":
      dx = 0;
      break;
  }
}

function main(canvasName) {

  var context = createContext(canvasName);

  var tileFile = "Assets/Rooms/TestTiles.json";
  var styleFile = "Assets/Rooms/TestStyles.json";
  loadRoom(context.scene, tileFile, styleFile)

  BABYLON.Tools.RegisterTopRootEvents([{
    name: "keydown",
    handler: onKeyDown
  }, {
    name: "keyup",
    handler: onKeyUp
  }]);

  var renderLoop = function() {
    x += dx;
    y += dy;

    context.camera.position.x = x;
    context.camera.position.y = y;
    context.scene.render();
  };
  context.engine.runRenderLoop(renderLoop);
}
