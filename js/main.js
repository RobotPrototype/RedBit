function main(canvasName) {
  var context = createContext(canvasName);

  drawRoom(context.scene);

  var renderLoop = function() {
    context.scene.render();
  };
  context.engine.runRenderLoop(renderLoop);
}
