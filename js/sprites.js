const EPSILON = 0.01;

function spriteFactory(scene, assetPath, tileSize, name, numInstances) {
  console.log("Create sprite factory: " + name);

  var factory = new BABYLON.SpriteManager(name,
    assetPath,
    numInstances,
    tileSize,
    scene,
    EPSILON,
    BABYLON.Texture.NEAREST_SAMPLINGMODE);
  return factory;
}

function sprite(factory, name) {
  console.log("Create sprite: " + name);

  var sprite = new BABYLON.Sprite(name, factory);
  sprite.height = factory.cellHeight + 0.5;
  sprite.width = factory.cellWidth + 0.5;
  sprite.position.z = 1;
  return sprite;
}
