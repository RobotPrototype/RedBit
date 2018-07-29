function main(canvasName) {
  var context = createContext(canvasName);

  var robots = spriteFactory(context.scene, "Assets/Sprites/Robot.png", "robots", 3);
  var robot = sprite(robots, "robot");

  var bigBot = sprite(robots, "bigBot");
  bigBot.size *= 2;
  bigBot.position.x -= bigBot.size;

  var smallBot = sprite(robots, "smallBot");
  smallBot.size /= 2;
  smallBot.position.x += smallBot.size;

  var renderLoop = function() {
    context.scene.render();
  };
  context.engine.runRenderLoop(renderLoop);
}
