function main(canvasName) {

  var context = createContext(canvasName);

  loadRoom(context.scene, "Assets/Rooms/RoomTest.json");

  var renderLoop = function() {
    context.scene.render();
  };
  context.engine.runRenderLoop(renderLoop);
}
